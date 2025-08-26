# Morgan A Vickery – Academic Portfolio Website

This is the personal website and academic portfolio of **Morgan A Vickery, PhD**, designed to showcase her research, publications, teaching materials, and professional experiences. The site functions as an online CV, resource hub, and interactive archive of open-access academic tools and technologies.

## 🌐 Live Site

[morganavickery.com](https://morganavickery.com)

## 🎯 Purpose

This website serves multiple roles:

* Present Morgan A Vickery’s academic background, research interests, and publications.
* Host interactive tools such as the **Publications Database** and **Open-Access Resources**.
* Provide access to professional documents like a CV.
* Highlight teaching resources and accessibility-centered design work.

## 🗂️ Pages and Features

| Page | File | Description |
|----|----|----|
| Home | `index.html` | Landing page with sections on research, projects, technologies, and CV. Optional Google Analytics. |
| Publications | `database.html` | Dynamic, card-based rendering of Morgan’s publication database from a CSV data source. |
| Open-Access Resources | `resources.html` | A curated list of publicly available learning and teaching tools, documents, and templates. |
| Navigation | `navigation.html` | Sidebar-based navigation with links to key sections and social media profiles. |
| Footer | `footer.html` | Standardized footer used across pages. |

## 🔧 Tech Stack

* **HTML5**, **CSS3**, **JavaScript (Vanilla)**
* [Bootstrap 5](https://getbootstrap.com/)
* [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
* [Glightbox](https://biati-digital.github.io/glightbox/)
* [Swiper.js](https://swiperjs.com/)
* [Google Fonts](https://fonts.google.com/)
* **Custom CSS/JS**: `assets/css/*.css`, `assets/js/*.js`

## 🛠️ Setup

1. **Update `site-config.json`**
   - Located at the project root.
   - Replace placeholder values with your own site details.
   - Top-level fields include:
     - `name`: Display name for the site owner.
     - `tagline`: Short tagline shown on the homepage hero section.
     - `typedItems`: Array of phrases for the homepage typing animation.
     - `about`: Blurb for the “About” section on the home page.
     - `social`: Links for social media icons (keys: `bluesky`, `twitter`, `google_scholar`, `github`, `linkedin`).
     - `contact`: Email addresses shown in the navigation footer (`academic`, `industry`).
     - `analyticsId`: Google Analytics ID (e.g., `G-XXXXXXXXXX`). Remove this field to disable tracking.
   - Example:
   ```jsonc
   {
     // Display name for the site owner
     "name": "Jane Doe",
     // Short tagline shown on the homepage hero section
     "tagline": "Data Scientist",
     // Short blurb for the About section on the home page
     "about": "I explore data-driven solutions to social problems.",
     "typedItems": ["Scientist", "Teacher"],
     // Social media profile links. Remove a URL to hide its icon.
     "social": {
       "bluesky": "https://bsky.app/profile/example.bsky.social",
       "twitter": "https://twitter.com/example",
       "google_scholar": "https://scholar.google.com/",
       "github": "https://github.com/example",
       "linkedin": "https://www.linkedin.com/in/example/"
     },
     // Contact email addresses displayed in the navigation footer
     "contact": {
       "academic": "academic@example.edu",
       "industry": "industry@example.com"
     },
     "analyticsId": "G-XXXXXXXXXX"
   }
   ```
   - `site-config.json` supports `//` comments for readability. Tools that require strict JSON may fail to parse these comments; remove them or use a friendlier format like YAML and convert back to JSON before deployment.

2. **Replace images and data**
   - Swap images in `assets/img/` with your own files.
   - Replace `assets/uploads/database.csv` with your data while keeping the header row.

3. **Add resources**
   - Edit `assets/data/resources.json` to manage entries shown on `resources.html`.
   - Each item requires a `title`, `description`, and `link`. Optional fields like `meta`, `type`, or `embed` add extra details or custom layouts.
   - Example:
     ```json
     [
       {
         "title": "Example Resource",
         "description": "Short summary of the resource.",
         "link": "https://example.com",
         "meta": "Optional extra info",
         "type": "whimsical",
         "embed": "https://whimsical.com/embed/example"
       }
     ]
     ```

4. **Preview locally**
   ```bash
   python3 -m http.server
   ```
   Visit `http://localhost:8000` to view the site.

### Common mistakes

- Missing quotes or trailing commas in `site-config.json` (especially after removing comments).
- Renaming images without updating their paths in the HTML/CSS.
- Removing the header row from `database.csv`.


## 🎨 Theme Attribution


This project expands on the [iPortfolio template](https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/) by **BootstrapMade.com**License: [BootstrapMade License](https://bootstrapmade.com/license/)

## 👩‍🎓 Author Info

**Morgan A Vickery, PhD**

* Learning Scientist, UX Designer, and Educator
* Contact: `moravick@iu.edu` or `morganavickery@gmail.com`

## 📬 Connect With Me

* [Google Scholar](https://scholar.google.com/citations?user=k8qDnxsAAAAJ)
* [LinkedIn](https://www.linkedin.com/in/morganavickery/)
* [GitHub](https://github.com/moravick)
* [BlueSky](https://bsky.app/profile/morganavickery.bsky.social)
* [Twitter](https://twitter.com/_moravick)


---


