# Academic Portfolio Website Template

## 1. Create Your Own Copy of the Template!

*GitHub* is a website for storing and sharing files. A *repository* (or *repo*) is just a folder of files for  software on GitHub.

1. Make a free account at [github.com](https://github.com/).
2. Click **Fork** to create your own copy of this repo. Forking means "make my own version on GitHub".
3. To host your site at `https://YOURNAME.github.io`, go to your fork’s **Settings → General** page and rename the repo to `YOURNAME.github.io`.
4. Want the files on your computer? Click the green **Code** button → **Download ZIP** and unzip it. That download is sometimes called a *clone*.
5. You can edit files directly on GitHub (open a file and click the ✏️ icon) or drag‑and‑drop new files with the **Upload files** button. No command line is required.

*GitHub Pages* is GitHub’s free service for turning a repo into a public website. You will use it in Step 7.

## 2. Overview of the Repository

You mainly edit small text files that describe your content. Other files handle layout and style automatically.

| Goal | Edit this file | Files that make it work (ignore these) | Where it shows up |
|----|----|----|----|
| Site title, tagline, contact links | `site-config.json` | `assets/js/site-config.js` | every page |
| Menu text and order | `navigation.html` | `assets/js/navigation.js`, `assets/css/navigation.css` | top navigation bar |
| Footer text | `footer.html` | `assets/css/index.css` | bottom of every page |
| Home page sections (About, Research, Publications, Projects, Technologies) | data files in `assets/data` | `index.html`, `assets/js/index-content.js`, `assets/css/index.css` | home page |
| Resources page items | `assets/data/resources.json` | `resources.html`, `assets/js/resources.js`, `assets/css/resources.css` | resources page |
| Full publications list | `assets/data/database.csv` | `database.html`, `assets/js/database.js`, `assets/css/database.css` | publications page |
| Photos (profile, hero) | images in `assets/img` | `index.html`, `navigation.html` | home page & menu |

## 3. Replace Text, Data, and Images

All editable data files live in `assets/data`, and images live in `assets/img`.

### Data file cheat sheet

| File | What it controls | Example snippet | Notes |
|----|----|----|----|
| `site-config.json` | Name, tagline, social links | `{"name":"Your Name"}` | Leave a link blank to hide its icon. |
| `about.json` | Short bio and list of roles | `{ "text": "One sentence.", "roles": [{"role": "PhD Student", "institution": "Example Univ."}] }` |    |
| `research.json` | Topics you study | `{ "topics": ["Topic one", "Topic two"] }` |    |
| `publications.json` | A few highlighted citations on the home page | `{ "publications": [{"citation": "Author (2024)", "link": "https://..."}] }` | Use for a small set of featured works. |
| `projects.json` | Research projects | `{ "featured": [{"title": "Big Project"}], "other": [{"title": "Small Project"}] }` | `featured` shows large cards; `other` shows a simple list. |
| `technologies.json` | Tools or software you created | `{ "technologies": [{"title": "Tool", "role": "Developer"}] }` |    |
| `resources.json` | Resource links page | `[ {"title": "Template", "description": "What it is", "link": "https://..."} ]` | Each item needs `title`, `description`, `link`. |
| `database.csv` | Full publications list | `date,"authors",title,venue,link`<br>`2024,"A. Author",Example Paper,Conf,https://...` | Keep the header exactly as shown. |

### Upload your own files

* **CV** – replace `assets/data/cv.pdf` with your PDF.
* **Profile picture** – replace `assets/img/profile-headshot.png` (keep the name or update `index.html` and `navigation.html`).
* **Hero image** – replace `assets/img/hero-image.jpg` or change the file name in `index.html`.
* **Full publications list** – upload your own `database.csv` with the same header.

## 4. File Naming Tips

* Keep data file names the same (`about.json`, `projects.json`, etc.).
* For new images, use simple names like `my-photo.jpg` (lowercase letters, numbers, dashes). If you change a file name, update any HTML or JSON that refers to it.
* The CSV must stay named `database.csv` and include the header row.

## 5. Remove Sections You Don’t Need

* To hide a section on the home page, wrap its block in HTML comments in `index.html`:

  ```html
  <!--
  <section id="technologies">
    ...
  </section>
  -->
  ```
* Hide its link in `navigation.html` the same way:

  ```html
  <!-- <li><a href="#technologies">Technologies</a></li> -->
  ```
* If a data file is empty, the section will simply appear blank.
* Leaving a social or contact link empty in `site-config.json` hides it automatically.

## 6. Preview the Site Locally
Double‑click `index.html` to open it in a browser. If some sections look empty, your browser may require a simple local server:
```bash
python3 -m http.server
```
Then visit `http://localhost:8000` in a browser.

## 7. Make It Live on the Internet
1. Commit and push your changes to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then **Save**.
5. Wait a minute for GitHub Pages to build your site. Refresh `https://YOURNAME.github.io/` (or `https://YOURNAME.github.io/REPO_NAME/` if you used a different repo name).

## 8. Use Your Own Domain (Optional)
If you already own a domain name (like `example.com`), you can point it to your GitHub Pages site.

1. Open the file named `CNAME` in this repo (or create one) and replace its contents with your domain name, e.g. `example.com`.
2. In the repo’s **Settings → Pages → Custom domain** box, type the same domain name and click **Save**.
3. At your domain provider’s website, find the DNS settings and create a **CNAME** record that points your domain (or `www` subdomain) to `YOURNAME.github.io`.
4. DNS changes can take a while—after it updates, your site will appear at your domain.

If you decide not to use a custom domain, delete the `CNAME` file so GitHub Pages uses the default `YOURNAME.github.io` address.
## 8. Credits

This template is adapted from the [iPortfolio theme](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) by BootstrapMade by Dr. Morgan Vickery ([morganavickery.com]()) for the purposes of junior academics creating their own free-to-run professional websites. Need support? Email Morgan at morganavickery@gmail.com -- shes happy to help :) 