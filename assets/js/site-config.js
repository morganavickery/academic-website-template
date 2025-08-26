function stripComments(str) {
  return str.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '').trim();
}

let siteConfig = null;

async function fetchSiteConfig() {
  try {
    const res = await fetch('site-config.json');
    const text = await res.text();
    siteConfig = JSON.parse(stripComments(text));
    applySiteConfig();
  } catch (err) {
    console.error('Failed to load site-config.json', err);
  }
}

function applySiteConfig() {
  if (!siteConfig) return;

  if (siteConfig.name) {
    const currentTitle = document.title;
    if (!currentTitle || currentTitle === 'Portfolio' || currentTitle === siteConfig.name) {
      document.title = siteConfig.name;
    } else if (!currentTitle.includes(siteConfig.name)) {
      document.title = `${currentTitle} - ${siteConfig.name}`;
    }
  }

  const navName = document.querySelector('#navigation .sitename');
  if (navName && siteConfig.name) navName.textContent = siteConfig.name;

  const heroName = document.getElementById('site-name');
  if (heroName && siteConfig.name) heroName.textContent = siteConfig.name;

  const tagline = document.getElementById('site-tagline');
  if (tagline && siteConfig.tagline) tagline.textContent = siteConfig.tagline;

  const aboutText = document.getElementById('about-text');
  if (aboutText && siteConfig.about) aboutText.textContent = siteConfig.about;

  if (siteConfig.social) {
    const socialMap = {
      bluesky: 'social-bluesky',
      twitter: 'social-twitter',
      google_scholar: 'social-google-scholar',
      github: 'social-github',
      linkedin: 'social-linkedin'
    };
    Object.entries(socialMap).forEach(([key, id]) => {
      const link = document.getElementById(id);
      if (!link) return;
      const url = siteConfig.social[key];
      if (url) {
        link.href = url;
        link.style.display = '';
      } else {
        link.style.display = 'none';
      }
    });
  } else {
    ['social-bluesky', 'social-twitter', 'social-google-scholar', 'social-github', 'social-linkedin'].forEach(id => {
      const link = document.getElementById(id);
      if (link) link.style.display = 'none';
    });
  }

  if (siteConfig.contact) {
    const academic = document.getElementById('contact-academic');
    if (academic) {
      if (siteConfig.contact.academic) {
        academic.textContent = siteConfig.contact.academic;
        academic.parentElement.style.display = '';
      } else {
        academic.parentElement.style.display = 'none';
      }
    }
    const industry = document.getElementById('contact-industry');
    if (industry) {
      if (siteConfig.contact.industry) {
        industry.textContent = siteConfig.contact.industry;
        industry.parentElement.style.display = '';
      } else {
        industry.parentElement.style.display = 'none';
      }
    }
  } else {
    ['contact-academic', 'contact-industry'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.parentElement.style.display = 'none';
    });
  }

  const footerName = document.querySelector('#footer .sitename');
  if (footerName && siteConfig.name) footerName.textContent = siteConfig.name;
}

document.addEventListener('DOMContentLoaded', fetchSiteConfig);
document.addEventListener('navigationLoaded', applySiteConfig);
document.addEventListener('footerLoaded', applySiteConfig);
