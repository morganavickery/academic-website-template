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
| Home | `index.html` | Landing page with sections on research, projects, technologies, and CV. Includes embedded analytics. |
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
   - **Before**
   ```json
   {
     "siteTitle": "Morgan A Vickery",
     "tagline": "Learning Scientist"
   }
   ```
   **After**
   ```json
   {
     "siteTitle": "Jane Doe",
     "tagline": "Data Scientist"
   }
   ```
   - Ensure the JSON syntax stays valid (use double quotes and commas).

2. **Replace images and data**
   - Swap images in `assets/img/` with your own files.
   - Replace `assets/uploads/database.csv` with your data while keeping the header row.

3. **Preview locally**
   ```bash
   python3 -m http.server
   ```
   Visit `http://localhost:8000` to view the site.

### Common mistakes

- Missing quotes or trailing commas in `site-config.json`.
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


