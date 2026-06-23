# Earth Retreat Foundation — website

The website for **Earth Retreat Foundation**, a grassroots environmental NGO in
Chhattisgarh, India working on climate change, biodiversity conservation
(BMC/PBR), plastic awareness & reduction, tree plantation, and capacity building
of rural people.

- **Live site:** <https://earthretreat.org>
- **Repo:** <https://github.com/iamshaupa/ERF_website>
- **Hosting:** GitHub Pages (static), served from the `main` branch at the repo root.
- **Contact shown on site:** `info@earthretreat.org`

This README is for **collaborators / developers**. Two companion guides cover the
other audiences:

- [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) — for the **non-technical content editor**.
  How to add events ("chapters") just by making folders in Google Drive. No code.
- [`SETUP.md`](SETUP.md) — the **one-time technical setup** for the Google Drive →
  website sync (service account, secrets, Pages). Do this once.

---

## How it works

It's a plain **static site** — hand-written HTML/CSS/JS, no build step, no
framework, no dependencies beyond Google Fonts. You can open the pages directly
or serve the folder; GitHub Pages just publishes the files as-is.

The one dynamic piece is the **Field Diary** (`chapters.html`). It fetches
[`data/chapters.json`](data/chapters.json) in the browser and renders each event
as a card with a detail view (description, photo galleries, embedded videos,
theme filter). That JSON — and the media under `assets/chapters/` — is **generated
automatically** from a Google Drive folder by a nightly GitHub Action. Nobody
edits it by hand.

```
Google Drive folder ("Chapter 01", "Chapter 02", …)
        │   the content editor only ever touches this
        ▼   GitHub Actions, daily 17:00 UTC (= 22:30 IST), or run on demand
   scripts/sync_drive.py
     · reads the Drive folder via a service account (read-only)
     · parses each chapter's .docx (title / Date: / Location: / write-up)
     · turns every sub-folder into a named section, downsizes photos,
       builds Drive video embeds
        ▼
   writes data/chapters.json + assets/chapters/NN/…  and commits if changed
        ▼
   GitHub Pages redeploys → the new chapter appears on the Field Diary page
```

See [`SETUP.md`](SETUP.md) for the architecture in more detail and the chapter
folder naming rules (`Chapter 14 : Piperchhedi : Biodiversity` → number 14,
location *Piperchhedi*, theme *Biodiversity*).

---

## Repository layout

Everything sits at the **repo root** (this matters: GitHub Actions only runs
workflows found at `.github/workflows/`, and Pages with a custom domain is
happiest serving from root).

```
.
├── index.html              Home — hero, six theme animations, stats, CTAs
├── about.html              Story, mission/vision, objectives, "Our Reach"
├── services.html           "What We Do" — the six focus areas
├── projects.html           Programs (incl. bilingual EN / हिंदी toggle)
├── team.html               Resource persons
├── contact.html            Contact details + front-end contact form
├── chapters.html           Field Diary — renders data/chapters.json
│
├── css/style.css           All styles (incl. the SVG animations & chapters UI)
├── js/main.js              Nav, scroll reveals, animated counters, etc.
│
├── assets/
│   ├── logo.png            Foundation logo (square)
│   └── chapters/           GENERATED media (per-chapter images). Not hand-edited.
│
├── data/
│   └── chapters.json       GENERATED Field Diary content. Not hand-edited.
│
├── scripts/
│   ├── sync_drive.py       The Drive → site sync script
│   └── requirements.txt    Python deps (google-api-python-client, python-docx, Pillow)
│
├── .github/workflows/
│   └── sync-drive.yml      Nightly sync job (cron + manual "Run workflow")
│
├── CONTENT_GUIDE.md        For the content editor (Drive folders → site)
├── SETUP.md                One-time technical setup
└── README.md               You are here
```

> **Generated files** (`data/chapters.json`, `assets/chapters/`) are overwritten
> by the sync each run — edit the Google Drive content, not these files.

---

## Local development

No build step. Edit the HTML/CSS/JS and refresh the browser.

For most pages you can just open the `.html` file. **The Field Diary
(`chapters.html`) must be served over HTTP**, though — it uses `fetch()` to load
`data/chapters.json`, which browsers block on `file://`. Serve the folder:

```bash
# from the repo root
python -m http.server 8000
# then open http://localhost:8000/  (and /chapters.html)
```

Any static server works (`npx serve`, VS Code "Live Server", etc.).

### Running the sync locally (optional)

You normally don't need to — the GitHub Action does it. But to test the script:

```bash
pip install -r scripts/requirements.txt

# the same two values that live in GitHub Secrets:
export GOOGLE_SERVICE_ACCOUNT_JSON="$(cat /path/to/service-account-key.json)"
export DRIVE_FOLDER_ID="the-drive-folder-id"

python scripts/sync_drive.py        # rewrites data/chapters.json + assets/chapters/
```

The script reads the Drive content folder, finds every `Chapter NN` folder, and
prints what it found per chapter. If a chapter folder is empty in Drive, that
chapter renders with no content — fill the Drive folder and re-run.

---

## Deploying

Just push to `main`:

```bash
git add .
git commit -m "…"
git push
```

GitHub Pages redeploys automatically in a minute or two. The custom domain
`earthretreat.org` is configured under **Settings → Pages** (a `CNAME` file lives
in the repo).

The nightly content sync commits to `main` on its own as `erf-content-bot`. If
you push at the same time and get a rejected push, pull and merge first:

```bash
git pull --no-rebase origin main
git push
```

---

## Security — never commit the Google key

The Google **service-account JSON key** must **never** be committed — this is a
**public repo**. It lives only in the GitHub Secret `GOOGLE_SERVICE_ACCOUNT_JSON`
(and `DRIVE_FOLDER_ID` alongside it), which the workflow reads at runtime.

[`.gitignore`](.gitignore) blocks `*.json` as a safety net (with an explicit
exception for `data/chapters.json`, the one JSON the site needs). If a key ever
leaks, revoke it in the Google Cloud console (the service account's **Keys** tab)
and create a new one.

---

## Conventions

- **Chapter folders** in Drive: `Chapter NN`, optionally
  `Chapter NN : Location`, optionally `Chapter NN : Location : Theme`
  (two-digit number sets serialisation; newest shows first).
- **Inside a chapter:** the `.docx` is the write-up (its filename becomes the
  section heading); **every other sub-folder becomes a section** named after the
  folder. Prefix names with a number (`1 Info.docx`, `2 Gallery`, …) to control
  order.
- **Themes** drive the Field Diary filter chips. Canonical spellings are
  normalised in `scripts/sync_drive.py` → `KNOWN_TAGS`; edit that map to add new
  ones.
- **Commit messages** in this repo use a `#NNN - summary` convention (e.g.
  `#003 - Update domain to earthretreat.org and contact email`).

Full content rules: [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md).
