# Academic Portfolio Website Template

A simple, free-to-host personal website for academics, researchers, and students.You edit a few small text files; the site handles layout and styling for you.


> No coding required. If you can fill in a form, you can update this site.

# 1) Make your own copy (no-code)

You’ll create your own copy of this template and publish it for free with GitHub Pages.

## **A. Get the files**








1. Create a free account at **github.com** (if you don’t have one).
2. Open this template’s repository and click **Fork**(top-right). \n This makes a copy under your account that you control.

## **B. Name it so it becomes a website**

* If you want your site to live at `https://YOURNAME.github.io`:

  
  1. Go to **Settings → General** in your fork.
  2. Rename the repo to `YOURNAME.github.io` and save.
* If you prefer a sub-path (e.g., `https://YOURNAME.github.io/portfolio/`), you can keep any repo name.

## **C. Publish with GitHub Pages**








1. In your repo, go to **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **Branch:** `main` and **Folder:** `/ (root)` → **Save**.
4. Wait \~1 minute. Your site will appear at the URL shown on that page.

> You can update content anytime by editing the data files in your repo. Changes publish automatically after you save.

## **D. How to edit**

* **On GitHub (easiest):** open a file → click the **✏️ pencil** → make changes → **Commit changes**.
* **On your computer:** click the green **Code** button → **Download ZIP** → unzip → edit files → (optional) push back to GitHub if you use Git.

# 2) What to edit (and where it shows up)

You’ll mostly edit small JSON/CSV files in `assets/data`. Images live in `assets/img`.

| File (path) | What it controls (types inside, if any) | Fields (human-readable) | How this file works (plain-English notes) | Where it shows up |
|----|----|----|----|----|
| `assets/data/about.json` | Your identity and About content | **Your basic info:**• Name• Tagline• Typed words (a short list that rotates on the home page)• About text (short bio)**Roles:** add multiple roles — each role has:• Role title• Institution**Profile image:**• Image file path• Image alt text (short description for screen readers)**Social links:** optional links for:• Bluesky, Twitter/X, Google Scholar, GitHub, LinkedIn, Academia.edu, Web of Science, ResearchGate (leave blank to hide)**Contacts:** add multiple contacts — each contact has:• Email address• Type label (e.g., “academic”, “industry”) | Put your basic info here. “Typed words” animate on the hero. Roles render as “Role — Institution.” Social links only show if you provide a URL. Contacts become labeled email lines in the left nav. The profile image and its alt text are used in the nav. | Home hero (name, tagline, typed words), left navigation (name, headshot, social icons, contacts), About section (bio text + roles) |
| `assets/data/research.json` | Research topics chips | **Research topics:** add multiple topics — each topic is:• A short phrase (e.g., “Learning Sciences”) | Each topic becomes a little rounded “chip” that wraps onto new lines. Keep them short and scannable. | Home → “What do I research?” |
| `assets/data/publications.json` | **Featured publications** (short list on home) | **Featured items:** add multiple items — each item has:• Citation (you can use italics, links, etc.)• Optional link (adds a “Read now” button) | This is **only** the small highlighted list for the home page. Your **full** list belongs in `database.csv`. | Home → “Featured Publications” |
| `assets/data/database.csv` | **Full publications database** (table view) | **Columns (must be exact):**• date• authors• title• venue• link | Spreadsheet-style file: **one publication per row**. Keep the header exactly as listed. Use a full URL in `link` (DOI, PDF, etc.). | Publications page → `database.html` |
| `assets/data/projects.json` | Project tiles — **two groups**: Featured and Other | **Featured projects:** add multiple — each project has:• Icon name (Bootstrap Icons, e.g., `bi-rocket`)• Title• Short description• Optional bullet points (several short lines)• Optional role (either a single sentence, **or** two parts: Role title + Details)• Optional principles (two parts: Title + Details)• Optional link (shows a small arrow button)**Other projects:** same fields as Featured | Projects are split into **Featured** (top grid) and **Other** (below). Both render the same; grouping just controls where they appear. Icons come from Bootstrap Icons. If a link is provided, a small arrow button appears. | Home → “Research Projects” (Featured + Other) |
| `assets/data/technologies.json` | Technologies / tools cards | **Technologies:** add multiple — each has:• Title• Role (how you used it; e.g., “Designer”, “Developer”)• Optional link (adds “Visit Site” button) | Simple cards for tools/tech. Keep titles short. Role is a one-liner. Link is optional. | Home → “Technologies” |

You’ll mostly edit small JSON/CSV files in assets/data. Images live in assets/img.

> You usually don’t need to edit JavaScript or CSS. The site reads your data files and updates automatically.

# 3) Edit your information

## `about.json` (name, tagline, typed words, socials, contacts, profile image)

```json
{
  "name": "Jane Doe",
  "tagline": "Researcher, educator, and designer",
  "typedItems": ["Educator", "Researcher", "Designer", "Advocate"],

  "text": "Short bio for the About section.",
  "roles": [
    { "role": "PhD Student", "institution": "Example University" },
    { "role": "Designer", "institution": "Example Lab" }
  ],

  "profileImage": "assets/img/profile-headshot.png",
  "profileImageAlt": "Jane Doe profile photo",

  "social": {
    "bluesky": "https://bsky.app/profile/example",
    "twitter": "https://twitter.com/example",
    "google_scholar": "https://scholar.google.com/",
    "github": "https://github.com/example",
    "linkedin": "https://www.linkedin.com/in/example/",
    "academia": "",
    "webofscience": "",
    "researchgate": ""
  },

  "contacts": [
    { "email": "jane@university.edu", "type": "academic" },
    { "email": "jane@company.org", "type": "industry" }
  ]
}
```

* Leave a social link **blank** to hide that icon.
* Contacts render as labeled lines in the left navigation.

## `research.json` (list of research topics / areas)

```javascript
{ "topics": ["Learning Sciences", "HCI", "Design Methods"] }
```

## `publications.json` (featured only to be listed on main page)

```javascript
{
  "publications": [
    {
      "citation": "Doe, J. (2025). Title of Paper. *Journal*.",
      "link": "https://doi.org/..."
    }
  ]
}
```

## `projects.json` (with per-project icons)

```javascript
{
  "featured": [
    {
      "icon": "bi-search-heart",
      "title": "Project Alpha",
      "description": "Short description...",
      "bullets": ["Outcome A", "Outcome B"],
      "role": { "title": "Lead", "details": "Designed study + analysis" },
      "principles": { "title": "Principles", "details": "Equity-centered, participatory" },
      "link": "https://example.com"
    }
  ],
  "other": [
    { "icon": "bi-flower3", "title": "Project Beta", "description": "Another short description..." }
  ]
}
```

## How to pick icons (Bootstrap Icons)























1. Visit **https://icons.getbootstrap.com** and search for an icon.
2. Copy its name (looks like `bi-lightbulb`, `bi-kanban`, `bi-rocket`).
3. In your project item, set `"icon": "bi-rocket"`. \n That’s it—the icon will appear automatically.

> The template includes Bootstrap Icons via `assets/vendor/bootstrap-icons/bootstrap-icons.css`.

## `technologies.json`

```javascript
{
  "technologies": [
    { "title": "Tool A", "role": "Designer", "link": "https://..." },
    { "title": "Tool B", "role": "Developer" }
  ]
}
```


* If a resource has `"embed"`, it uses a wider **embedded** layout (text + iframe).
* **All tiles are clickable** and open the `link` in a new tab. The iframe remains interactive.

# 4) Site Preferences (Theme & Colors)

## **File:** `assets/data/site-preferences.json`

## **What it does:**

* Controls your site’s color theme (no CSS editing needed).

## **What you can set:**

* **Background** — the page background (usually white)
* **Text** — normal body text color
* **Heading** — titles (H1–H6)
* **Accent** — your “brand” color for links, buttons, highlights
* **Surface** — card/panel backgrounds that sit on top of the page
* **Contrast** — text/icons placed on top of the accent color (e.g., button text)
* **Nav** — default navigation text color (left menu)
* **Nav hover/active** — navigation text when hovered or selected
* **Mobile nav background** — background color of the mobile menu

## **How to change colors**








1. Open `assets/data/site-preferences.json`.
2. Edit the hex codes (e.g., `#006466`).
3. Save. The site updates automatically.


**Example:**

```javascript
{
  "colors": {
    "background": "#ffffff",
    "text": "#111111",
    "heading": "#111111",
    "accent": "#006466",
    "surface": "#ffffff",
    "contrast": "#ffffff",

    "nav": "#a8a9b4",
    "navHover": "#ffffff",
    "navMobileBg": "#040b14"
  }
}
```

## **Tips**

* Keep **Background** light for easy reading.
* Choose a bold **Accent** so links/buttons stand out.
* Make sure **Contrast** is readable on top of your Accent (white often works best).
* If a color doesn’t seem to change, double-check the hex code (must start with `#`).

## **Troubleshooting**

* Nothing changes? Make sure the file is valid JSON (no trailing commas, matched quotes).
* Still stuck? Confirm the file path is exactly `assets/data/site-preferences.json`

# 5) Add or remove sections

Don’t want a section? In the page HTML (e.g., `index.html`), wrap it in `<!-- ... -->` to hide it, and optionally comment out the matching nav link in `navigation.html`. If a data file is empty, that section will simply render blank.

# 6a) Adding a Publications Database *(optional)*

**Publications database page:** A complete, table-style list of your publications sourced from a CSV file. Each row includes date, authors, title, venue, and a link to the paper or DOI. If a doi link is available, an “access paper” button will appear.

## **File:** `assets/data/database.csv`

## **What it does:**

Powers the full publications **table** on the Publications page (`database.html`). \n (Your**featured** papers for the home page live separately in `assets/data/publications.json`.)

## Required columns (must match exactly)

`date,authors,title,venue,link`

* **date** — Year
* **authors** — List of authors (MUST be surrounded by quotes)
* **title** — Paper title
* **venue** — Journal/Conference/Publisher
* **link** — DOI or a direct URL to the paper/PDF (leave blank if none available


**Example row:**

```javascript
2025,"Doe, J.; Smith, A.",An Example Paper,Example Conference,https://doi.org/10.xxxx/xxxxx
```

## Easiest way to edit








1. Open the CSV in Excel/Google Sheets.
2. Keep the **header row exactly** as above.
3. One publication per row.
4. Export/Save as CSV (if using a spreadsheet), then place it at `assets/data/database.csv`.

**Tips**

* If any cell contains commas (like author lists), spreadsheets will handle quoting for you automatically.
* Use a permanent URL in **link** (prefer a DOI link).
* Keep dates consistent (all years is fine; you don’t need full dates).

**Troubleshooting**

* Table is empty? Check that the **header names match exactly** (no extra spaces, capitalization matters).
* Weird characters? Make sure you saved as **UTF-8 CSV** (most tools do this by default).



# 6b) (optional) Adding a Resources Page

**Resources page:** A curated collection of open-access materials—guides, tools, demos, etc.—displayed as tiles. Items can include an optional live embed (preview) and each tile opens its link in a new tab.

## **File:** `assets/data/resources.json`

## **What it does:**

Powers the **Resources** page (`resources.html`). You can list normal resources or ones with an **embedded** live preview (iframe).

## Types of Resource Tiles

* **Standard** — Title, meta label, description, and a link.
* **Embedded**— Everything above \*\*__plus __\*\*a live preview (iframe). \n *Embedded resources are automatically shown **first**, then standard ones.*

## What you can set

* **Page title** and **subtitle**
* For each **resource**:
  * **Title**
  * **Meta** (short label like “PDF”, “Toolkit”)
  * **Description** (one or two sentences)
  * **Link** (the tile opens this in a new tab)
  * **Embed** *(optional)* — URL for a live preview (makes it an **Embedded** tile)
  * **Embed height** *(optional)* — number (pixels) for preview height (e.g., `320`)
  * **Embed title** *(optional)* — short description for accessibility

**Example:**

```javascript
{
  "page-title": "Open-Access Resources",
  "page-subtitle": "Guides, templates, and live demos",
  "resources": [
    {
      "title": "Interactive Diagram",
      "meta": "Live Prototype",
      "description": "Explore the model in your browser.",
      "embed": "https://example.com/embeddable",
      "iframeHeight": 320,
      "iframeTitle": "Interactive diagram live preview",
      "link": "https://example.com/full"
    },
    {
      "title": "Heuristics Guide",
      "meta": "PDF",
      "description": "Quick, practical criteria.",
      "link": "https://example.com/guide.pdf"
    }
  ]
}
```


## **How it behaves**

* If a resource has an **Embed** URL → it becomes an **Embedded** tile (text + preview) and appears **before** standard tiles.
* **All tiles are clickable** and open the **Link** in a new tab (the preview stays interactive).
* **Embed height** lets you make the preview taller/shorter.
* **Embed title** makes screen readers happier.


## **Troubleshooting**

* Nothing shows? Make sure the top-level key is `resources` (not `publications`).
* Embedded preview won’t load? Some sites don’t allow embedding—try their share/embed URL if available.

# 7) Publish your site (GitHub Pages)





















1. Push your changes to your fork on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder → **Save**.
5. After a minute, your site will be live at:
   * `https://YOURNAME.github.io/` if you named the repo `YOURNAME.github.io`
   * otherwise `https://YOURNAME.github.io/REPO_NAME/`

# 8) Use your own domain (optional)


1. Create a file named `CNAME` in the repo with your domain (e.g., `example.com`).
2. In **Settings → Pages**, set **Custom domain** to that domain.
3. At your domain provider, add a **CNAME** DNS record pointing to `YOURNAME.github.io`.
4. DNS updates can take time; once active, your site will load at your domain.

# 9) Troubleshooting

* **Icons not showing?**
  * Make sure your project icon names start with`bi-` (e.g., `bi-lightbulb`) and that `assets/vendor/bootstrap-icons/bootstrap-icons.css` is included (it is by default).
* **A section is empty?**
  * Check the matching data file for typos or missing fields. The site only renders what it finds. Even missing punctuation, spaces, or line-breaks can cause errors.
* **Resources not appearing?**
  * Ensure that each item has at least a `title`. Add `link` for full-tile click behavior; add `embed` to use the embedded layout.
* **Profile image not changing?**
  * Update`profileImage` in `about.json` and confirm the file exists at that path.
  * Rename your image to `profile-headshot.png` and ensure it is in the assets/img/… folder


