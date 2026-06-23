#!/usr/bin/env python3
"""
Earth Retreat Foundation — Google Drive → website content sync (dynamic sections).

Reads a Google Drive content folder, finds every "Chapter NN" sub-folder, and
turns each into a structured entry in data/chapters.json plus optimised media
under assets/chapters/NN/.

DYNAMIC SECTIONS
----------------
Inside a Chapter folder, the Word document (.docx) is the chapter description.
EVERY OTHER SUB-FOLDER becomes a section on the website, named after the folder.
Whatever images and/or videos are in that folder are shown under that name.

    Chapter 12
    ├── description.docx     -> chapter title / date / location / write-up
    ├── Images               -> a section called "Images"
    ├── Videos               -> a section called "Videos"
    ├── Newspapers           -> a section called "Newspapers"
    └── Testimonials         -> a section called "Testimonials"

Add a folder -> a new section appears. Remove a folder -> that section is gone.
Nothing is hardcoded.

Optional ordering: prefix a folder name with a number to control the order of
sections on the page, e.g. "1 Images", "2 Newspapers", "3 Testimonials". The
number is stripped from the displayed name. Unprefixed folders follow,
alphabetically.

Environment variables (set by the GitHub Actions workflow):
    GOOGLE_SERVICE_ACCOUNT_JSON   full service-account key JSON (as a string)
    DRIVE_FOLDER_ID               id of the shared content folder
"""

import io
import json
import os
import re
import shutil
import sys

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from PIL import Image
import docx  # python-docx

# ----------------------------------------------------------------------------
# Config
# ----------------------------------------------------------------------------
SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root
ASSETS_DIR = os.path.join(ROOT, "assets", "chapters")
DATA_FILE = os.path.join(ROOT, "data", "chapters.json")

# "Chapter 14", "Chapter 14 : Piperchhedi",
# or "Chapter 06 : Mohla : Biodiversity"
#   group(1) = number
#   group(2) = optional location (text after the first colon)
#   group(3) = optional tag      (text after the second colon)
CHAPTER_RE = re.compile(
    r"^chapter\s*0*(\d{1,3})"
    r"(?:\s*:\s*([^:]*?))?"
    r"(?:\s*:\s*(.*))?$",
    re.IGNORECASE,
)
ORDER_PREFIX_RE = re.compile(r"^\s*(\d+)\s*[-_.)]?\s+")  # "1 Images", "02-News"
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
VIDEO_EXT = {".mp4", ".mov", ".webm", ".m4v", ".avi", ".mkv"}
MAX_IMAGE_WIDTH = 1600
JPEG_QUALITY = 82


# ----------------------------------------------------------------------------
# Drive helpers
# ----------------------------------------------------------------------------
def get_service():
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        sys.exit("ERROR: GOOGLE_SERVICE_ACCOUNT_JSON is not set.")
    creds = Credentials.from_service_account_info(json.loads(raw), scopes=SCOPES)
    return build("drive", "v3", credentials=creds, cache_discovery=False)


def list_children(svc, folder_id, only_folders=False, only_files=False):
    q = [f"'{folder_id}' in parents", "trashed = false"]
    if only_folders:
        q.append("mimeType = 'application/vnd.google-apps.folder'")
    if only_files:
        q.append("mimeType != 'application/vnd.google-apps.folder'")
    query = " and ".join(q)
    items, token = [], None
    while True:
        resp = svc.files().list(
            q=query,
            fields="nextPageToken, files(id, name, mimeType, modifiedTime, size)",
            orderBy="name_natural",
            pageSize=200,
            pageToken=token,
            supportsAllDrives=True,
            includeItemsFromAllDrives=True,
        ).execute()
        items.extend(resp.get("files", []))
        token = resp.get("nextPageToken")
        if not token:
            break
    return items


def download_bytes(svc, file_id):
    req = svc.files().get_media(fileId=file_id, supportsAllDrives=True)
    buf = io.BytesIO()
    dl = MediaIoBaseDownload(buf, req)
    done = False
    while not done:
        _, done = dl.next_chunk()
    buf.seek(0)
    return buf


# ----------------------------------------------------------------------------
# Naming helpers
# ----------------------------------------------------------------------------
def order_key(name):
    """Sort sections: numbered prefixes first (in order), then alphabetical."""
    m = ORDER_PREFIX_RE.match(name)
    if m:
        return (0, int(m.group(1)), name.lower())
    return (1, 0, name.lower())


def display_name(name):
    """Drop an optional leading ordering number for the on-screen section name."""
    cleaned = ORDER_PREFIX_RE.sub("", name).strip()
    return cleaned or name.strip()


def slugify(name):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", name.strip().lower()).strip("-")
    return s or "section"


# Known themes get a canonical spelling so small typos/case differences don't
# create duplicate filter chips. Anything not listed is just trimmed and
# title-cased, so new themes still work without code changes.
KNOWN_TAGS = {
    "biodiversity": "Biodiversity",
    "climate change": "Climate Change",
    "climate": "Climate Change",
    "plastic reduction": "Plastic Reduction",
    "plastic": "Plastic Reduction",
    "tree plantation": "Tree Plantation",
    "plantation": "Tree Plantation",
    "afforestation": "Tree Plantation",
    "capacity building": "Capacity Building",
    "capacity building of rural people": "Capacity Building",
}


def normalize_tag(raw):
    t = re.sub(r"\s+", " ", (raw or "").strip())
    if not t:
        return ""
    return KNOWN_TAGS.get(t.lower(), t.title())


def safe_img_name(name, index):
    base = re.sub(r"[^a-zA-Z0-9._-]", "_", name).rsplit(".", 1)[0]
    return f"{index:02d}_{base[:40]}.jpg"


# ----------------------------------------------------------------------------
# Content processing
# ----------------------------------------------------------------------------
def parse_docx(buf):
    document = docx.Document(buf)
    title, date, location = "", "", ""
    body_parts = []
    for para in document.paragraphs:
        text = para.text.strip()
        if not text:
            continue
        low = text.lower()
        if not title:
            title = text
            continue
        if low.startswith("date:"):
            date = text.split(":", 1)[1].strip()
            continue
        if low.startswith("location:"):
            location = text.split(":", 1)[1].strip()
            continue
        chunk = ""
        for run in para.runs:
            t = (run.text or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            chunk += f"<strong>{t}</strong>" if run.bold else t
        body_parts.append(f"<p>{chunk or text}</p>")
    summary = ""
    if body_parts:
        summary = re.sub(r"<[^>]+>", "", body_parts[0])
        if len(summary) > 180:
            summary = summary[:177].rstrip() + "…"
    return {
        "title": title or "Untitled chapter",
        "date": date, "location": location,
        "body_html": "\n".join(body_parts), "summary": summary,
    }


def save_image(buf, dest_path):
    try:
        im = Image.open(buf).convert("RGB")
        if im.width > MAX_IMAGE_WIDTH:
            h = round(im.height * MAX_IMAGE_WIDTH / im.width)
            im = im.resize((MAX_IMAGE_WIDTH, h), Image.LANCZOS)
        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
        im.save(dest_path, "JPEG", quality=JPEG_QUALITY, optimize=True)
        return True
    except Exception as e:  # noqa
        print(f"      ! skipped image ({e})")
        return False


def build_section(svc, folder, nn, slug):
    """Turn one chapter sub-folder into a section: collect its images + videos."""
    files = list_children(svc, folder["id"], only_files=True)
    images, videos = [], []
    rel_dir = f"assets/chapters/{nn}/{slug}"
    abs_dir = os.path.join(ROOT, "assets", "chapters", nn, slug)
    idx = 1
    for f in files:
        ext = os.path.splitext(f["name"])[1].lower()
        mime = f.get("mimeType", "")
        if ext in IMAGE_EXT or mime.startswith("image/"):
            fname = safe_img_name(f["name"], idx)
            if save_image(download_bytes(svc, f["id"]), os.path.join(abs_dir, fname)):
                images.append(f"{rel_dir}/{fname}")
                idx += 1
        elif ext in VIDEO_EXT or mime.startswith("video/"):
            videos.append({
                "title": os.path.splitext(f["name"])[0],
                "embed": f"https://drive.google.com/file/d/{f['id']}/preview",
            })
        # other file types (e.g. stray docs) are ignored inside sections
    return images, videos


# ----------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------
def main():
    folder_id = os.environ.get("DRIVE_FOLDER_ID", "").strip()
    if not folder_id:
        sys.exit("ERROR: DRIVE_FOLDER_ID is not set.")

    svc = get_service()

    if os.path.isdir(ASSETS_DIR):
        shutil.rmtree(ASSETS_DIR)
    os.makedirs(ASSETS_DIR, exist_ok=True)
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

    top = list_children(svc, folder_id, only_folders=True)
    chapter_folders = []
    for f in top:
        m = CHAPTER_RE.match(f["name"].strip())
        if m:
            loc = (m.group(2) or "").strip()
            tag = normalize_tag(m.group(3) or "")
            chapter_folders.append((int(m.group(1)), loc, tag, f))
    chapter_folders.sort(key=lambda x: x[0])
    print(f"Found {len(chapter_folders)} chapter folder(s).")

    chapters = []
    for number, folder_location, folder_tag, folder in chapter_folders:
        nn = f"{number:02d}"
        print(f"\u2192 Chapter {nn}: {folder['name']}")
        sub_folders = list_children(svc, folder["id"], only_folders=True)
        sub_files = list_children(svc, folder["id"], only_files=True)

        # The .docx (any name) holds the chapter's title / date / write-up.
        meta = {"title": f"Chapter {nn}", "date": "", "location": "",
                "body_html": "", "summary": ""}
        doc = next((x for x in sub_files
                    if x["name"].lower().endswith(".docx")), None)
        doc_heading, doc_order = "", (1, 0, "")
        if doc:
            stem = os.path.splitext(doc["name"])[0]          # "1 Info"
            doc_heading = display_name(stem)                 # "Info"
            doc_order = order_key(stem)                       # for sequencing
            try:
                meta = parse_docx(download_bytes(svc, doc["id"]))
            except Exception as e:  # noqa
                print(f"    ! could not parse {doc['name']}: {e}")

        # Location from the folder name ("Chapter 14 : Piperchhedi") wins over
        # any 'Location:' line in the document.
        if folder_location:
            meta["location"] = folder_location

        # Build one ordered sequence: the document section + every sub-folder.
        # Each item carries its own order key (numeric prefix) so the on-page
        # order matches the numbering, e.g. 1 Info, 2 Gallery, 3 Videos, ...
        items = []
        if doc and meta["body_html"]:
            items.append((doc_order, {
                "type": "text",
                "name": doc_heading or "About",
                "body_html": meta["body_html"],
            }))

        used_slugs = set()
        for sf in sub_folders:
            slug = slugify(display_name(sf["name"]))
            base_slug, n = slug, 2
            while slug in used_slugs:                  # avoid path collisions
                slug = f"{base_slug}-{n}"; n += 1
            used_slugs.add(slug)
            images, videos = build_section(svc, sf, nn, slug)
            if not images and not videos:
                print(f"    \u00b7 section '{sf['name']}' is empty — skipped")
                continue
            items.append((order_key(sf["name"]), {
                "type": "media",
                "name": display_name(sf["name"]),
                "images": images,
                "videos": videos,
            }))

        items.sort(key=lambda it: it[0])
        sections = [it[1] for it in items]

        cover = ""
        for sec in sections:
            if sec.get("images"):
                cover = sec["images"][0]
                break
        for sec in sections:
            if sec["type"] == "media":
                print(f"    + section '{sec['name']}': "
                      f"{len(sec['images'])} image(s), {len(sec['videos'])} video(s)")
            else:
                print(f"    + section '{sec['name']}': document text")

        chapters.append({
            "number": nn,
            "title": meta["title"], "date": meta["date"],
            "location": meta["location"], "tag": folder_tag,
            "summary": meta["summary"],
            "cover": cover,
            "sections": sections,
        })

    chapters.sort(key=lambda c: int(c["number"]), reverse=True)  # newest first

    with open(DATA_FILE, "w", encoding="utf-8") as fh:
        json.dump({"updated": _now(), "chapters": chapters}, fh,
                  ensure_ascii=False, indent=2)
    print(f"Wrote {DATA_FILE} with {len(chapters)} chapter(s).")


def _now():
    from datetime import datetime, timezone, timedelta
    ist = timezone(timedelta(hours=5, minutes=30))
    return datetime.now(ist).strftime("%d %b %Y, %H:%M IST")


if __name__ == "__main__":
    main()
