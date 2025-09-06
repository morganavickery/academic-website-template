/* indexcontent.js */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
  loadSitePreferences();  
  loadAbout();
  loadResearch();
  loadPublications();
  loadProjects();
  loadTechnologies();
});

function applyThemeFromPreferences(theme) {
  if (!theme) return;
  const root = document.documentElement;
  const c = theme.colors || {};

  // Map JSON keys → CSS variables (supports your current variable names)
  const map = {
    background: '--background-color',
    default: '--default-color',
    heading: '--heading-color',
    accent: '--accent-color',
    surface: '--surface-color',
    contrast: '--contrast-color',

    nav: '--nav-color',
    navHover: '--nav-hover-color',
    navMobileBg: '--nav-bg', // new shorter token

    // optional extras
    mutedText: '--muted-text-color',
    softText: '--soft-text-color',
    border: '--border-color',
    tileBg: '--tile-bg',
    badgeBg: '--badge-bg',
    heroOverlayStart: '--hero-overlay-start',
    heroOverlayEnd: '--hero-overlay-end'
  };

  Object.entries(map).forEach(([key, cssVar]) => {
    if (c[key]) root.style.setProperty(cssVar, c[key]);
  });
}

function setSectionHeadings(sections) {
  if (!sections) return;
  const map = {
    mywork: '#mywork .section-title h2',
    projects: '#projects .section-title h2',
    technologies: '#technologies .section-title h2',
    cv: '#cv .section-title h2',
    publications: '#publications .section-title h2',
    resources: '#resources .section-title h2'
  };
  Object.entries(map).forEach(([key, sel]) => {
    const el = document.querySelector(sel);
    if (el && sections[key]) el.textContent = sections[key];
  });
}

function loadSitePreferences() {
  fetch('assets/data/site-preferences.json', { cache: 'no-store' })
    .then(r => r.json())
    .then(prefs => {
      applyThemeFromPreferences(prefs.theme);
      setSectionHeadings(prefs.sections);
    })
    .catch(err => console.error('Failed to load site-preferences.json', err));
}
