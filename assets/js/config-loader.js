let siteConfig = {};

function applyConfig() {
  if (!siteConfig) return;

  const authorName = document.querySelector('#author-name');
  if (authorName) authorName.textContent = siteConfig.authorName;

  const navAuthor = document.querySelector('#nav-author-name');
  if (navAuthor) navAuthor.textContent = siteConfig.authorName;

  const academicEmail = document.querySelector('#academic-email');
  if (academicEmail) academicEmail.textContent = siteConfig.academicEmail;

  const industryEmail = document.querySelector('#industry-email');
  if (industryEmail) industryEmail.textContent = siteConfig.industryEmail;

  const footerTitle = document.querySelector('#footer-site-title');
  if (footerTitle) footerTitle.textContent = siteConfig.siteTitle;

  if (siteConfig.siteTitle) {
    document.title = siteConfig.siteTitle;
  }
}

function loadConfig() {
  return fetch('site-config.json')
    .then(response => response.json())
    .then(config => {
      siteConfig = config;
      applyConfig();
      return config;
    })
    .catch(err => console.error('Failed to load site config', err));
}

window.siteConfigReady = loadConfig();
window.applyConfig = applyConfig;
