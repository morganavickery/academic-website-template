// Load homepage sections from JSON files
document.addEventListener('DOMContentLoaded', () => {
  loadAbout();
  loadResearch();
  loadPublications();
  loadProjects();
  loadTechnologies();
});

function loadAbout() {
  fetch('assets/data/about.json')
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

function loadResearch() {
  fetch('assets/data/research.json')
    .then(r => r.json())
    .then(data => {
      const container = document.getElementById('research-topics');
      if (!container || !Array.isArray(data.topics)) return;
      data.topics.forEach(topic => {
        const div = document.createElement('div');
        div.className = 'mini-tile';
        const h6 = document.createElement('h6');
        h6.textContent = topic;
        div.appendChild(h6);
        container.appendChild(div);
      });
    })
    .catch(err => console.error('Failed to load research.json', err));
}

function loadPublications() {
  fetch('assets/data/publications.json')
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

function loadProjects() {
  fetch('assets/data/projects.json')
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

function loadTechnologies() {
  fetch('assets/data/technologies.json')
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
