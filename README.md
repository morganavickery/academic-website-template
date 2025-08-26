# Academic Portfolio Website Template

A simple website for showcasing your academic work. Everything is plain HTML, CSS, and JavaScript so you can host it anywhere (such as GitHub Pages).

## 1. Get Your Own Copy

1. **Fork** this repository on GitHub. Forking means "make my own copy on GitHub." You can edit your fork without affecting the original.
2. To host the site at `https://YOURNAME.github.io`, go to your fork’s **Settings → General** page and rename the repository to `YOURNAME.github.io`.
3. You can edit files directly on GitHub: open a file and click the ✏️ icon, or press **Download ZIP** to work on the files on your computer without using the command line.

## 2. Replace Text, Data, and Images

All editable files live in the `assets/data` and `assets/img` folders.
You can upload replacements through GitHub’s **Upload files** button or by dragging files into the folder in the web interface.

### `site-config.json`
Controls the name, tagline, and contact links used across the site.
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
- **`publications.json`** – a few highlighted citations that appear on the home page.
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
  *`featured` projects show up as large cards with descriptions; `other` projects appear as a simple list.*
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

`publications.json` is for a handful of featured works on the home page, while `database.csv` lists every publication on a separate page.

### Uploading your own files
- **CV** – replace `assets/data/cv.pdf` with your PDF.
- **Full publications list** – upload your own `database.csv` with the same header.
- **Profile picture** – replace `assets/img/profile headshot.png` (keep the same name or update `index.html` and `navigation.html`).
- **Hero image** – replace `assets/img/rene-bohmer-YeUVDKZWSZ4-unsplash.jpg` or change the file name in `index.html`.

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
Double‑click `index.html` to open it in a browser. If some sections look empty, your browser may require a simple local server:
```bash
python3 -m http.server
```
Then visit `http://localhost:8000` in a browser.

## 6. Make It Live on the Internet
1. Commit and push your changes to GitHub.
2. If you renamed the repository to `YOURNAME.github.io`, your site will live at `https://YOURNAME.github.io/`.
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then **Save**.
6. Wait a minute for GitHub Pages to build your site. Refresh `https://YOURNAME.github.io/` (or `https://YOURNAME.github.io/REPO_NAME/` if you kept a different repo name).

## 7. Credits
This template is adapted from the [iPortfolio theme](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) by BootstrapMade.
