/* indexcontent.js */
"use strict";

// Load homepage sections from JSON files
document.addEventListener('DOMContentLoaded', () => {
  loadSiteConfig();
  loadAbout();
  loadResearch();
  loadPublications();
  loadProjects();
  loadTechnologies();
});

async function loadSiteConfig() {
  try {
    const res = await fetch('assets/data/site-config.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load site-config.json (${res.status})`);
    const data = await res.json();

    // Apply theme FIRST so the page paints with the chosen colors
    applyThemeFromConfig(data.theme);

    // Populate hero, etc.
    const nameEl = document.getElementById('site-name');
    if (nameEl && data.name) nameEl.textContent = data.name;
    const taglineEl = document.getElementById('site-tagline');
    if (taglineEl && data.tagline) taglineEl.textContent = data.tagline;

    const typedHost = document.querySelector('.typed');
    if (typedHost && Array.isArray(data.typedItems) && data.typedItems.length) {
      if (window.Typed) {
        new Typed('.typed', {
          strings: data.typedItems,
          typeSpeed: 55,
          backSpeed: 35,
          backDelay: 1100,
          smartBackspace: true,
          loop: true
        });
      } else {
        let i = 0;
        typedHost.textContent = data.typedItems[0];
        setInterval(() => {
          i = (i + 1) % data.typedItems.length;
          typedHost.textContent = data.typedItems[i];
        }, 1600);
      }
    }
  } catch (err) {
    console.error('Failed to load assets/data/site-config.json', err);
  }
}

/* =========================
   About: assets/data/about.json
   ========================= */
function loadAbout() {
  fetch('assets/data/about.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const aboutText = document.getElementById('about-text');
      if (aboutText && data.text) {
        aboutText.textContent = data.text;
      }
      const list = document.getElementById('about-roles');
      if (list && Array.isArray(data.roles)) {
        data.roles.forEach(item => {
          const p = document.createElement('p');
          if (item.role) {
            const em = document.createElement('em');
            em.textContent = item.role;
            p.appendChild(em);
          }
          if (item.institution) {
            const strong = document.createElement('strong');
            strong.textContent = item.institution;
            if (p.childNodes.length > 0) p.append(' | ');
            p.appendChild(strong);
          }
          list.appendChild(p);
        });
      }
    })
    .catch(err => console.error('Failed to load about.json', err));
}

/* =========================
   Research: assets/data/research.json
   ========================= */
function loadResearch() {
  fetch('assets/data/research.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('research-topics');
      if (!container || !Array.isArray(data.topics)) return;

      container.innerHTML = ''; // reset

      data.topics.forEach(topic => {
        const chip = document.createElement('span');
        chip.className = 'topic-tile';
        chip.textContent = topic;
        container.appendChild(chip);
      });
    })
    .catch(err => console.error('Failed to load research.json', err));
}

/* =========================
   Publications: assets/data/publications.json
   ========================= */
function loadPublications() {
  fetch('assets/data/publications.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('publications-list');
      if (!container || !Array.isArray(data.publications)) return;
      data.publications.forEach(pub => {
        const p = document.createElement('p');
        if (pub.citation) p.innerHTML = pub.citation;
        if (pub.link) {
          const a = document.createElement('a');
          a.href = pub.link;
          a.className = 'tile-link';
          a.innerHTML = 'Read Now<i class="bi bi-arrow-right"></i>';
          p.append(' ');
          p.appendChild(a);
        }
        container.appendChild(p);
      });
    })
    .catch(err => console.error('Failed to load publications.json', err));
}

/* =========================
   Projects: assets/data/projects.json
   ========================= */
function loadProjects() {
  fetch('assets/data/projects.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const featured = document.getElementById('projects-featured');
      const other = document.getElementById('projects-other');
      if (featured && Array.isArray(data.featured)) {
        data.featured.forEach(p => featured.appendChild(makeProjectTile(p)));
      }
      if (other && Array.isArray(data.other)) {
        data.other.forEach(p => other.appendChild(makeProjectTile(p)));
      }
    })
    .catch(err => console.error('Failed to load projects.json', err));
}

function makeProjectTile(project) {
  const tile = document.createElement('div');
  tile.className = 'project-tile';

  if (project.link) {
    const header = document.createElement('div');
    header.className = 'tile-header';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'icon flex-shrink-0';
    const icon = document.createElement('i');
    icon.className = project.icon ? `bi ${project.icon}` : 'bi';
    iconWrap.appendChild(icon);
    header.appendChild(iconWrap);

    const linkWrap = document.createElement('div');
    linkWrap.className = 'tile-link-container';
    const a = document.createElement('a');
    a.href = project.link;
    a.className = 'tile-link';
    a.innerHTML = '<i class="bi bi-arrow-right"></i>';
    linkWrap.appendChild(a);
    header.appendChild(linkWrap);
    tile.appendChild(header);
  } else {
    const iconWrap = document.createElement('div');
    iconWrap.className = 'icon flex-shrink-0';
    const icon = document.createElement('i');
    icon.className = project.icon ? `bi ${project.icon}` : 'bi';
    iconWrap.appendChild(icon);
    tile.appendChild(iconWrap);
  }

  const content = document.createElement('div');
  const title = document.createElement('h4');
  title.className = 'title';
  title.textContent = project.title || '';
  content.appendChild(title);

  if (project.description) {
    const desc = document.createElement('p');
    desc.className = 'description';
    desc.textContent = project.description;
    content.appendChild(desc);
  }

  if (Array.isArray(project.bullets)) {
    const ul = document.createElement('ul');
    project.bullets.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      ul.appendChild(li);
    });
    content.appendChild(ul);
  }

  if (project.role) {
    const role = document.createElement('p');
    role.className = 'role';
    if (typeof project.role === 'object') {
      if (project.role.title) {
        const strong = document.createElement('strong');
        strong.textContent = project.role.title;
        role.appendChild(strong);
      }
      if (project.role.details) {
        if (role.childNodes.length > 0) role.append(' | ');
        role.append(project.role.details);
      }
    } else {
      role.innerHTML = project.role;
    }
    content.appendChild(role);
  }

  if (project.principles) {
    const prin = document.createElement('p');
    prin.className = 'principles';
    if (project.principles.title) {
      const strong = document.createElement('strong');
      strong.textContent = project.principles.title;
      prin.appendChild(strong);
    }
    if (project.principles.details) {
      if (prin.childNodes.length > 0) prin.append(' | ');
      prin.append(project.principles.details);
    }
    content.appendChild(prin);
  }

  tile.appendChild(content);
  return tile;
}

/* =========================
   Technologies: assets/data/technologies.json
   ========================= */
function loadTechnologies() {
  fetch('assets/data/technologies.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('technologies-list');
      if (!container || !Array.isArray(data.technologies)) return;
      data.technologies.forEach(t => {
        const wrapper = document.createElement('div');
        const tile = document.createElement('div');
        tile.className = 'technologies-content h-100 custom-tile';

        const header = document.createElement('div');
        header.className = 'tile-header';
        const h4 = document.createElement('h4');
        h4.textContent = t.title || '';
        header.appendChild(h4);
        if (t.role) {
          const p = document.createElement('p');
          p.textContent = t.role;
          header.appendChild(p);
        }
        tile.appendChild(header);

        if (t.link) {
          const footer = document.createElement('div');
          footer.className = 'tile-footer';
          const a = document.createElement('a');
          a.href = t.link;
          a.className = 'tile-link';
          a.innerHTML = 'Visit Site <i class="bi bi-arrow-right"></i>';
          footer.appendChild(a);
          tile.appendChild(footer);
        }

        wrapper.appendChild(tile);
        container.appendChild(wrapper);
      });
    })
    .catch(err => console.error('Failed to load technologies.json', err));
}

function applyThemeFromConfig(theme) {
  if (!theme) return;
  const root = document.documentElement;

  const c = theme.colors || {};
  const colorMap = {
    background: '--background-color',
    default: '--default-color',
    heading: '--heading-color',
    accent: '--accent-color',
    surface: '--surface-color',
    contrast: '--contrast-color',
    nav: '--nav-color',
    navHover: '--nav-hover-color',
    navMobileBg: '--nav-mobile-background-color',

    /* NEW: extended theme keys users can set */
    mutedText: '--muted-text-color',
    softText: '--soft-text-color',
    border: '--border-color',
    tileBg: '--tile-bg',
    badgeBg: '--badge-bg',
    heroOverlayStart: '--hero-overlay-start',
    heroOverlayEnd: '--hero-overlay-end'
  };

  Object.entries(colorMap).forEach(([key, cssVar]) => {
    if (c[key]) root.style.setProperty(cssVar, c[key]);
  });
}