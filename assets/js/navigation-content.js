// --- If you don't already have this helper in this file, include it ---
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json();
}

/* =========================
   Nav identity (from about.json)
   ========================= */
function populateNavIdentity(about) {
  // 1) Site name in the nav
  const nameEl = document.getElementById('nav-site-name');
  if (nameEl && about && about.name) {
    nameEl.textContent = String(about.name);
  }

  // 2) Profile image in the nav
  const imgEl = document.querySelector('.navigation .profile-img img');
  if (imgEl) {
    const src =
      (about && about.profileImage) ||
      imgEl.getAttribute('src') ||
      'assets/img/profile-headshot.png';
    imgEl.src = src;

    const alt =
      (about && about.profileImageAlt) ||
      (about && about.name ? `${about.name} profile photo` : imgEl.alt || 'Profile image');
    imgEl.alt = alt;
  }
}

/* =========================
   Social buttons (from about.social)
   ========================= */
function renderSocialLinks(social) {
  const container = document.querySelector('.navigation .social-links');
  if (!container) return;

  container.innerHTML = '';
  if (!social) return;

  const CATALOG = [
    { key: 'bluesky',        icon: 'icon_bluesky.png',       label: 'BlueSky' },
    { key: 'twitter',        icon: 'icon_twitter.png',       label: 'Twitter / X' },
    { key: 'google_scholar', icon: 'icon_gscholar.png',      label: 'Google Scholar' },
    { key: 'github',         icon: 'icon_github.png',        label: 'GitHub' },
    { key: 'linkedin',       icon: 'icon_linkedin.png',      label: 'LinkedIn' },
    { key: 'academia',       icon: 'icon_academia.png',      label: 'Academia.edu' },
    { key: 'webofscience',   icon: 'icon_webofscience.png',  label: 'Web of Science' },
    { key: 'researchgate',   icon: 'icon_researchgate.png',  label: 'ResearchGate' }
  ];

  CATALOG.forEach(({ key, icon, label }) => {
    const url = social[key];
    if (!url) return;

    const a = document.createElement('a');
    a.href = url;
    a.className = 'social-button';
    a.target = '_blank';
    a.rel = 'me noopener noreferrer';
    a.setAttribute('aria-label', label);
    a.title = label;

    const img = document.createElement('img');
    img.src = `assets/img/icons/${icon}`;
    img.alt = `${label} icon`;
    img.className = 'social-icon';
    img.loading = 'lazy';

    a.appendChild(img);
    container.appendChild(a);
  });
}

/* =========================
   Contacts (from about.contacts)
   ========================= */
function populateContacts(about) {
  const container = document.getElementById('contact-container');
  if (!container) return;

  container.innerHTML = '';
  if (!about || !Array.isArray(about.contacts)) return;

  about.contacts.forEach(c => {
    if (!c || !c.email || !c.type) return;

    const p = document.createElement('p');

    const em = document.createElement('em');
    em.textContent = c.type;

    const strong = document.createElement('strong');
    strong.id = `contact-${c.type.toLowerCase()}`;
    strong.textContent = c.email;

    p.appendChild(em);
    p.appendChild(document.createElement('br'));
    p.appendChild(strong);

    container.appendChild(p);
    container.appendChild(document.createElement('hr'));
  });
}

/* =========================
   Init (waits for injected nav)
   ========================= */
async function initNavigationContent() {
  try {
    const about = await loadJSON('assets/data/about.json');

    populateNavIdentity(about);
    renderSocialLinks(about.social);
    populateContacts(about);
  } catch (err) {
    console.error(err);
    const container = document.getElementById('contact-container');
    if (container) container.innerHTML = '<p>Unable to load contact info.</p>';
  }
}

let _navInitDone = false;
function initNavigationContentOnce() {
  if (_navInitDone) return;
  _navInitDone = true;
  initNavigationContent();
}

// Try once on DOM ready (in case nav HTML is already present)
document.addEventListener('DOMContentLoaded', initNavigationContent);

// Also run after navigation.html is injected
document.addEventListener('navigationLoaded', initNavigationContentOnce);
