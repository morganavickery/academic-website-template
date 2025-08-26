# Academic Portfolio Website Template

A simple website for showcasing your academic work. Everything is plain HTML, CSS, and JavaScript so you can host it anywhere (such as GitHub Pages).

## 1. Make Your Own Copy

1. **Fork** this repository (click the **Fork** button on GitHub). Forking means "make my own copy on GitHub." You can edit your fork without affecting the original.
2. **Clone** your fork: downloading a copy to your computer. On your fork's page, click the **Code** button and copy the URL. Then run:
   ```bash
   git clone YOUR_URL_HERE
   ```
   If you prefer not to use Git, you can press **Download ZIP** on GitHub and unzip the folder.

## 2. Replace Text and Images

Open the files in any text editor (VS Code, Notepad, etc.). The site works by reading small data files, so you only change the text there.

### `site-config.json`
This file controls the name, tagline, and contact links used across the site.
```json
{
  "name": "Your Name",
  "tagline": "Short description shown on the home page",
  "typedItems": ["Word 1", "Word 2"],
  "social": {
    "bluesky": "https://bsky.app/profile/...",
    "twitter": "https://twitter.com/...",
    "google_scholar": "https://scholar.google.com/...",
    "github": "https://github.com/...",
    "linkedin": "https://www.linkedin.com/in/..."
  },
  "contact": {
    "academic": "you@university.edu",
    "industry": "you@company.com"
  },
  "analyticsId": "G-XXXXXXXXXX"
}
```
*Leave a link blank to hide that icon. Omit `analyticsId` if you do not use Google Analytics.*

### Home page data (`assets/data/`)
Each section on the home page reads from a small JSON file:
- **`about.json`** – short paragraph and list of roles.
  ```json
  {
    "text": "One sentence about yourself.",
    "roles": [{"role": "PhD Student", "institution": "Example University"}]
  }
  ```
- **`research.json`** – topics you study.
  ```json
  {"topics": ["Topic one", "Topic two"]}
  ```
- **`publications.json`** – a few highlighted citations.
  ```json
  {"publications": [{"citation": "Author (Year). Title.", "link": "https://example.com"}]}
  ```
- **`projects.json`** – research projects.
  ```json
  {
    "featured": [{"icon": "bi-search", "title": "Big Project", "description": "Short blurb.",
                    "role": {"title": "Lead", "details": "2024"}}],
    "other": [{"icon": "bi-flower3", "title": "Small Project"}]
  }
  ```
  *`icon` uses [Bootstrap Icons](https://icons.getbootstrap.com/). Only the name after `bi-` is needed.*
- **`technologies.json`** – tools you created or maintain.
  ```json
  {"technologies": [{"title": "Tool Name", "role": "Developer", "link": "https://example.com"}]}
  ```
- **`resources.json`** – list of public resources. Each item needs a `title`, `description`, and `link`. Optional `meta`, `type`, and `embed` fields add details or special layouts.
  ```json
  [
    {"title": "Lesson Plan Template", "description": "What it is", "link": "https://example.com"}
  ]
  ```
- **`database.csv`** – used by `database.html` to show a full publications list. Keep the first line exactly as:
  ```csv
  date,"authors",title,venue,link
  ```
  Each row after that holds one publication.

### Images
Place your images in `assets/img/`.
- Replace `profile headshot.png` with your own picture (keep the same file name or update `index.html` and `navigation.html`).
- Replace `rene-bohmer-YeUVDKZWSZ4-unsplash.jpg` with any background photo, or change the name in `index.html`.

## 3. File Naming Tips
- Keep data file names the same. The scripts expect `about.json`, `projects.json`, etc.
- For new images, use simple names like `my-photo.jpg` (lowercase letters, numbers, dashes). If you change a file name, update any HTML or JSON that refers to it.
- The CSV must stay named `database.csv` and include the header row.

## 4. Remove Sections You Don't Need
- Delete or comment out the entire `<section>` block in `index.html` for the part you do not want (e.g., the Technologies section).
- Remove the matching link in `navigation.html` so the menu stays tidy.
- If a section's data file is empty, the section will simply appear blank.
- Leaving a social or contact link empty in `site-config.json` hides it automatically.

## 5. Preview the Site Locally
From the project folder run:
```bash
python3 -m http.server
```
Then visit `http://localhost:8000` in a browser.

## 6. Publish
Commit your changes and push them to your fork. On GitHub, go to **Settings → Pages** and choose the root folder to host the site with GitHub Pages.

## 7. Credits
This template is adapted from the [iPortfolio theme](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) by BootstrapMade.

