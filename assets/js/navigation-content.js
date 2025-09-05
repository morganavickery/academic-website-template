// REMOVE this block (it references "data" before it's defined):
// document.addEventListener('DOMContentLoaded', () => {
//   renderSocialLinks(data.social);
// });

async function loadAboutData(url = "assets/data/site-config.json") {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json();
}

function populateContacts(data) {
  const container = document.getElementById("contact-container");
  if (!container) return;

  container.innerHTML = ""; // clear existing
  if (!data || !Array.isArray(data.contacts)) return;

  data.contacts.forEach((c) => {
    if (!c || typeof c.email !== "string" || typeof c.type !== "string") return;

    const p = document.createElement("p");

    const em = document.createElement("em");
    em.textContent = c.type;

    const strong = document.createElement("strong");
    strong.id = `contact-${c.type.toLowerCase()}`;
    strong.textContent = c.email;

    p.appendChild(em);
    p.appendChild(document.createElement("br"));
    p.appendChild(strong);
    container.appendChild(p);
    container.appendChild(document.createElement("hr"));
  });
}

function renderSocialLinks(social) {
  const container = document.querySelector('.navigation .social-links');
  if (!container || !social) return;

  // Clear any static anchors already in the markup
  container.innerHTML = '';

  const CATALOG = [
    { key: 'bluesky',        icon: 'icon_bluesky.png',       label: 'BlueSky' },
    { key: 'twitter',        icon: 'icon_twitter.png',       label: 'Twitter / X' },
    { key: 'google_scholar', icon: 'icon_gscholar.png',      label: 'Google Scholar' },
    { key: 'github',         icon: 'icon_github.png',        label: 'GitHub' },
    { key: 'linkedin',       icon: 'icon_linkedin.png',      label: 'LinkedIn' },
    { key: 'academia',       icon: 'icon_academia.png',      label: 'Academia.edu' },
    { key: 'webofscience',   icon: 'icon_webofscience.png',  label: 'Web of Science' },
    { key: 'researchgate',   icon: 'icon_researchgate.png',  label: 'ResearchGate' },
  ];

  CATALOG.forEach(({ key, icon, label }) => {
    const url = social[key];
    if (!url) return; // skip if not provided

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

function initNavigationContent() {
  loadAboutData()
    .then((data) => {
      renderSocialLinks(data.social);   // existing
      populateContacts(data);           // if you use this
      populateNavIdentity(data);        // <-- add this line
    })
    .catch(console.error);
}

document.addEventListener("DOMContentLoaded", initNavigationContent);


document.addEventListener("DOMContentLoaded", initNavigationContent);

function populateNavIdentity(data) {
  // 1) Site name at the top of the nav
  const nameEl = document.getElementById('nav-site-name');
  if (nameEl) {
    const name = (data && data.name) ? String(data.name) : '';
    if (name) nameEl.textContent = name;
  }

  // 2) Profile image in the nav
  //    Supports optional fields in site-config.json:
  //    - profileImage: "assets/img/profile-headshot.png"
  //    - profileImageAlt: "Jane Doe headshot"
  const imgEl = document.querySelector('.navigation .profile-img img');
  if (imgEl) {
    const fallbackSrc = imgEl.getAttribute('src') || 'assets/img/profile-headshot.png';
    const src = (data && data.profileImage) ? data.profileImage : fallbackSrc;
    imgEl.src = src;

    const altFromData = (data && data.profileImageAlt) ? data.profileImageAlt
                    : (data && data.name) ? `${data.name} profile photo`
                    : imgEl.alt || 'Profile image';
    imgEl.alt = altFromData;
  }
}
