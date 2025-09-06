/* =========================
   INIT: fetch all & render
   ========================= */
document.addEventListener('DOMContentLoaded', async () => {
  const PATHS = {
    about:        'assets/data/about.json',
    research:     'assets/data/research.json',
    publications: 'assets/data/publications.json',
    projects:     'assets/data/projects.json',
    technologies: 'assets/data/technologies.json'
  };

  try {
    const [about, research, publications, projects, technologies] = await Promise.all([
      loadJSON(PATHS.about).catch(() => null),
      loadJSON(PATHS.research).catch(() => null),
      loadJSON(PATHS.publications).catch(() => null),
      loadJSON(PATHS.projects).catch(() => null),
      loadJSON(PATHS.technologies).catch(() => null)
    ]);

    renderHero(about);
    renderAbout(about);
    renderResearch(research);
    renderPublications(publications);
    renderProjects(projects);
    renderTechnologies(technologies);

  } catch (err) {
    console.error('Initialization error:', err);
  }
});

/**
 * index-content.js
 * Single DOM-ready init that fetches all data, then calls per-section renderers.
 * Hero (site name, tagline, typedItems) is now populated from about.json.
 */

/* =========================
   HERO (from ABOUT)
   assets/data/about.json
   ========================= */
function renderHero(about) {
  if (!about) return;

  const nameEl = document.getElementById('site-name');
  const taglineEl = document.getElementById('site-tagline');

  if (nameEl && about.name) nameEl.textContent = String(about.name);
  if (taglineEl && about.tagline) taglineEl.textContent = String(about.tagline);

  // typed.js (if present on the page)
  const typedHost = document.querySelector('.typed');
  if (typedHost && Array.isArray(about.typedItems) && about.typedItems.length) {
    if (window.Typed) {
      new Typed('.typed', {
        strings: about.typedItems,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1200,
        loop: true
      });
    } else {
      // Fallback: show as plain text
      typedHost.textContent = about.typedItems.join(' • ');
    }
  }
}

/* =========================
   ABOUT
   assets/data/about.json
   ========================= */
function renderAbout(data) {
  if (!data) return;

  const aboutText = document.getElementById('about-text');
  if (aboutText && data.text) {
    aboutText.textContent = data.text;
  }

  const list = document.getElementById('about-roles');
  if (list && Array.isArray(data.roles)) {
    list.innerHTML = '';
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
}

/* =========================
   RESEARCH
   assets/data/research.json
   ========================= */
function renderResearch(data) {
  const container = document.getElementById('research-topics');
  if (!container || !data || !Array.isArray(data.topics)) return;

  container.innerHTML = '';
  data.topics.forEach(topic => {
    const chip = document.createElement('span');
    chip.className = 'topic-tile';
    chip.textContent = topic;
    container.appendChild(chip);
  });
}

/* =========================
   PUBLICATIONS
   assets/data/publications.json
   ========================= */
function renderPublications(data) {
  const container = document.getElementById('publications-list');
  if (!container || !data || !Array.isArray(data.publications)) return;

  container.innerHTML = '';
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
}

/* =========================
   PROJECTS
   assets/data/projects.json
   ========================= */
function renderProjects(data) {
  if (!data) return;

  const featured = document.getElementById('projects-featured');
  const other = document.getElementById('projects-other');

  if (featured && Array.isArray(data.featured)) {
    featured.innerHTML = '';
    data.featured.forEach(p => featured.appendChild(makeProjectTile(p)));
  }

  if (other && Array.isArray(data.other)) {
    other.innerHTML = '';
    data.other.forEach(p => other.appendChild(makeProjectTile(p)));
  }
}

// Normalize anything like "search-heart", "bi-search-heart", or "bi bi-search-heart"
// into a clean class string: "bi bi-search-heart"
function normalizeBiIconClass(raw, fallback = 'bi-kanban') {
  if (!raw || typeof raw !== 'string') return `bi ${fallback}`;
  const text = raw.trim();

  // If the string already contains a token like "bi-xyz", extract it
  const match = text.match(/bi-[\w-]+/);
  const name  = match ? match[0] : (text.startsWith('bi-') ? text : `bi-${text}`);

  return `bi ${name}`;
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
    icon.className = normalizeBiIconClass(project.icon, 'bi-kanban'); // <-- here
    icon.setAttribute('aria-hidden', 'true');
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
    // no link → still show icon next to content
    const iconWrap = document.createElement('div');
    iconWrap.className = 'icon flex-shrink-0';

    const icon = document.createElement('i');
    icon.className = normalizeBiIconClass(project.icon, 'bi-kanban'); // <-- here
    icon.setAttribute('aria-hidden', 'true');

    iconWrap.appendChild(icon);
    tile.appendChild(iconWrap);
  }

  // ... keep the rest of your function (title, description, bullets, role, principles) ...
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
   TECHNOLOGIES
   assets/data/technologies.json
   ========================= */
function renderTechnologies(data) {
  const container = document.getElementById('technologies-list');
  if (!container || !data || !Array.isArray(data.technologies)) return;

  container.innerHTML = '';
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
      a.innerHTML = 'Visit Site<i class="bi bi-arrow-right"></i>';
      footer.appendChild(a);
      tile.appendChild(footer);
    }

    wrapper.appendChild(tile);
    container.appendChild(wrapper);
  });
}

