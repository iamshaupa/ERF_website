# Setup guide (one-time, technical) — Drive → Website sync

This is for **you** (the technical person). You do this **once**. After that,
your sister only ever works in Google Drive, and the website updates itself
every night at **22:30 IST**.

## How it works

```
Drive folder (Chapter 01, Chapter 02, …)
        │
        ▼  GitHub Actions, daily 17:00 UTC (22:30 IST)
   scripts/sync_drive.py  reads Drive via a service account,
   parses the Word docs, optimises photos, collects press
   scans + Drive video embeds
        │
        ▼  writes data/chapters.json + assets/chapters/NN/
   commits & pushes if anything changed
        │
        ▼
   GitHub Pages redeploys → new chapter live on the Field Diary page
```

The website's **Field Diary** page (`chapters.html`) reads
`data/chapters.json` in the browser and renders the chapters.

---

## Repo layout

These files/folders must sit at the **root of the repo** (the same level as
`index.html`), because GitHub Actions only runs workflows found at
`.github/workflows/` in the repo root:

```
<repo root>
├── .github/workflows/sync-drive.yml   ← the scheduled job
├── scripts/sync_drive.py              ← the sync script
├── scripts/requirements.txt
├── data/chapters.json                 ← generated (starts with sample data)
├── assets/chapters/                   ← generated media (starts with sample)
├── chapters.html                      ← the Field Diary page
├── index.html, about.html, …          ← the rest of the site
└── css/ js/ assets/logo.png
```

> If your site currently lives in a sub-folder of the repo, move it to the repo
> root (or give the site its own repo). The workflow path and the Pages
> publishing source both assume root.

---

## Step 1 — Google Cloud: service account + Drive API

1. Go to <https://console.cloud.google.com/> and create (or pick) a project.
2. **APIs & Services → Library →** enable **Google Drive API**.
3. **APIs & Services → Credentials → Create credentials → Service account.**
   Give it a name like `erf-drive-sync`. No roles needed. Create.
4. Open the new service account → **Keys → Add key → Create new key → JSON.**
   A `.json` file downloads. Keep it safe; you'll paste it into a GitHub secret.
5. Note the service account's **email** (looks like
   `erf-drive-sync@yourproject.iam.gserviceaccount.com`).

## Step 2 — Google Drive: share the content folder

1. Have your sister create the content folder in her Drive (e.g.
   **"ERF Website Content"**). This is where the `Chapter NN` folders live.
2. **Share** that folder with the service-account **email** from Step 1, as
   **Viewer**.
3. Also set the folder to **"Anyone with the link — Viewer"** (right-click →
   Share → General access). This lets the public website display the photos
   and play the Drive-embedded videos. (It's public NGO content, so this is
   expected.)
4. Open the folder in the browser and copy its **folder ID** from the URL:
   `https://drive.google.com/drive/folders/`**`THIS_LONG_ID`**

## Step 3 — GitHub: add the two secrets

In the repo: **Settings → Secrets and variables → Actions → New repository secret.**

| Secret name                   | Value                                             |
|-------------------------------|---------------------------------------------------|
| `GOOGLE_SERVICE_ACCOUNT_JSON` | paste the **entire contents** of the JSON key file |
| `DRIVE_FOLDER_ID`             | the folder ID from Step 2                          |

## Step 4 — GitHub Pages + Actions permissions

1. **Settings → Pages →** set the source to your branch (e.g. `main`) / root,
   and attach your custom domain `earthretreat.org`.
2. **Settings → Actions → General → Workflow permissions →** select
   **Read and write permissions** (so the job can push the synced content).

## Step 5 — Test it

- Go to the **Actions** tab → **"Sync content from Google Drive"** →
  **Run workflow** (manual trigger). Watch it run.
- If green, it will have replaced the sample chapter with whatever real
  `Chapter NN` folders exist in Drive, committed them, and Pages will redeploy.
- Open `https://earthretreat.org/chapters.html` to see the result.

From now on it runs automatically every night at 22:30 IST. You can always hit
**Run workflow** to publish immediately instead of waiting.

---

## Notes, limits & choices

- **Videos are embedded from Drive, not downloaded** into the repo — this keeps
  the repo small. They need the "Anyone with the link" sharing from Step 2 to
  play publicly. If a Drive video ever refuses to play (Google sometimes limits
  this), the robust alternative is to upload the video to YouTube (unlisted is
  fine) and embed that instead — tell me and I'll switch the video handling.
- **Photos are downsized** to max 1600px wide and recompressed, so large phone
  photos don't bloat the repo or slow the site.
- **Deletions sync too:** the script rebuilds `assets/chapters/` from scratch
  each run, so if your sister removes a Chapter folder or a photo in Drive, it
  disappears from the site at the next sync.
- **Location in the folder name:** name a chapter `Chapter 14 : Piperchhedi`
  and the text after the first colon becomes that chapter's location (it
  overrides any `Location:` line in the document).
- **Theme / category:** a second colon sets a theme, e.g.
  `Chapter 06 : Mohla : Biodiversity`. Themes become filter chips on the Field
  Diary page and a badge on the chapter. Spellings are normalised
  (`scripts/sync_drive.py` -> `KNOWN_TAGS`); edit that map to add canonical
  themes.
- **Document heading & order:** the `.docx` can have any name; that name becomes
  the heading of its text on the page, and the document sequences together with
  the folders by numeric prefix (e.g. `1 Info.docx`, `2 Gallery`, `3 Videos`).
- **Dynamic sections:** inside a chapter, the `.docx` is the description and
  **every other sub-folder becomes a section** named after the folder (photos
  and/or videos inside it). Add a folder → new section; remove it → section
  gone. Optional: prefix folder names with a number (e.g. `1 Images`) to set
  section order. The chapter folder itself must be exactly `Chapter NN`.
- **Schedule drift:** GitHub's cron can run a few minutes late under load.
  22:30 IST is "about 22:30", not to the second.
- **Cost:** free for public repos within GitHub Actions' free minutes; this job
  uses about a minute a day.
