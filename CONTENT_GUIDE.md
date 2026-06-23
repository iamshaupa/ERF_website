# How to add content to the website — simple guide

You do **not** need to touch any code or the website itself. You only work
inside **one Google Drive folder**. Whatever you put there shows up on the
website automatically every night at **10:30 PM (22:30 IST)**.

---

## The one rule: make a "Chapter" folder for each event

Inside the shared Drive folder, create a new folder for every event you want
on the website. The folder **must be named exactly** like this:

```
Chapter 01
Chapter 02
Chapter 03   ... and so on
```

- The word **Chapter**, then a space, then a **two-digit number** (01, 02 … 10, 11 …).
- Keep the numbers in order. The newest (highest number) shows at the top.
- Don't reuse a number. Each event gets its own.

**To set the location**, add a colon and the place after the number:

```
Chapter 14 : Piperchhedi
```

Everything after the `:` (with or without a space) becomes the **location**
shown on the website for that chapter. If you add it here, you don't need a
`Location:` line in the Word document — the folder name wins.

**To tag a chapter with a theme**, add a *second* colon and the theme name:

```
Chapter 06 : Mohla : Biodiversity
```

- The text after the **second** colon (`Biodiversity`) becomes the chapter's
  **theme**. It shows as a badge on the chapter and lets visitors filter the
  Field Diary by theme.
- Use the foundation's themes so they group neatly:
  **Biodiversity**, **Climate Change**, **Plastic Reduction**,
  **Tree Plantation**, **Capacity Building**. Spelling and capitalization are
  tidied up automatically (so `biodiversity` and `Biodiversity` count as the
  same theme). A new theme you invent still works — it just appears as its own
  filter.
- The theme is optional. `Chapter 06 : Mohla` (no second colon) simply has no
  theme badge and shows under "All themes".

---

## What goes inside a Chapter folder

Two kinds of things:

```
Chapter 12
├── description.docx     ← the write-up (a Word document)   ← always include this
├── Images               ← a folder  → becomes an "Images" section
├── Videos               ← a folder  → becomes a "Videos" section
├── Newspapers           ← a folder  → becomes a "Newspapers" section
└── Testimonials         ← a folder  → becomes a "Testimonials" section
```

### The Word document — its file name becomes a heading
The `.docx` file is the chapter's write-up. **Whatever you name the file
becomes the heading of that text on the website** — name it `Info` and the
section is called "Info"; name it `Description` and it's "Description".

The document also takes part in the numbering (see "Controlling the order"
below). So if you name it `1 Info.docx`, the write-up appears **first**, before
the folders numbered 2, 3, 4 … Write the document like this:

```
BMC Training & Awareness — Mohndi          ← Line 1 = the TITLE

Date: 11 May 2026                          ← starts with "Date:"
Location: Mohndi, North Singpur, Dhamtari  ← starts with "Location:"

On 11 May 2026 the team held a workshop on ...   ← the full write-up,
as many paragraphs as you like.                    **bold** stays bold.
```
Save it as **.docx** and name it `description.docx`.

### Every other folder becomes a section — automatically

**This is the important part. You are in full control.**

- **Any folder you create** inside the Chapter becomes a section on the website,
  with the **same name as the folder**. Put `Images`, `Videos`, `Newspapers`,
  `Testimonials`, `Drone shots`, `Posters` — whatever you like.
- Put **photos and/or videos** inside each folder. Photos show as a gallery;
  videos play embedded.
- **Add a folder** → a new section appears on the site.
- **Remove a folder** → that section disappears from the site.
- An **empty folder** simply shows nothing (no empty section).

So you are never limited to a fixed list. The website mirrors your folders.

### Controlling the order of sections (optional)
Sections appear in alphabetical order by default. To put them in a specific
order, start the folder name with a number — the number is hidden on the site:

```
1 Info.docx        (the Word document)
2 Gallery          (a folder)
3 Videos           (a folder)
4 Newspaper        (a folder)
5 Testimonials     (a folder)
```
shows on the website in exactly that order: the **Info** write-up first, then
**Gallery, Videos, Newspaper, Testimonials**. The numbers are hidden on the
site — they only set the order.

### Naming the files inside a folder (optional)
To control photo order within a section, start file names with numbers:
`1 opening.jpg`, `2 group.jpg`, `3 field visit.jpg`.

---

## That's it

1. Make a `Chapter NN` folder.
2. Put `description.docx` inside, plus any folders you want as sections.
3. Wait for the nightly update (10:30 PM IST). It appears on the **Field Diary**
   page the next morning.

Edit anything in Drive later (fix a typo, add photos, add a new section folder)
and the website updates itself at the next nightly sync.

> One-time technical note (your brother sets this up once): the Drive content
> folder must be **shared with the service-account email** (Viewer) and set to
> **"Anyone with the link — Viewer"** so photos and videos display publicly.
> See `SETUP.md`.
