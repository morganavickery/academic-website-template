// assets/js/resources.js
// JSON shape (preferred):
// {
//   "page-title": "Open-Access Resources",
//   "page-subtitle": "Subheading...",
//   "resources": [
//     {
//       "title": "…",
//       "meta": "…",
//       "description": "…",
//       "link": "https://…",            // used for click/keyboard open in new tab
//       "embed": "https://…",           // if present → embedded layout
//       "iframeHeight": 300,            // optional
//       "iframeTitle": "Accessible title" // optional; falls back to title
//     }
//   ]
// }
//
// Legacy key "publications" is also supported.

document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/resources.json', { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error(`Failed to load resources.json (${r.status})`);
      return r.json();
    })
    .then(data => {
      // 1) Hero title/subtitle
      const pageTitle = data['page-title'] || '';
      const pageSubtitle = data['page-subtitle'] || '';

      const h2 = document.getElementById('resources-title') || document.querySelector('#hero .container h2');
      const h3 = document.getElementById('resources-subtitle') || document.querySelector('#hero .container h3');
      if (h2 && pageTitle) h2.textContent = pageTitle;
      if (h3 && pageSubtitle) h3.textContent = pageSubtitle;
      if (pageTitle) document.title = pageTitle;

      // 2) Items: prefer data.resources, fallback to data.publications
      const items = Array.isArray(data.resources)
        ? data.resources
        : Array.isArray(data.publications)
          ? data.publications
          : [];

      const container = document.getElementById('resource-cards');
      if (!container) return;
      container.innerHTML = '';

      // Partition: embedded first (stable order within groups)
      const isEmbedded = r => typeof r?.embed === 'string' && r.embed.trim() !== '';
      const embeddedItems = items.filter(isEmbedded);
      const normalItems   = items.filter(r => !isEmbedded(r));

      // Helpers
      const openInNewTab = (url) => {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
      };

      const makeClickable = (el, url) => {
        if (!url) return;
        el.classList.add('clickable');       // optional: add cursor styling in CSS
        el.setAttribute('role', 'link');     // accessibility
        el.tabIndex = 0;

        el.addEventListener('click', (e) => {
          // Don’t hijack clicks on explicit links or the iframe itself
          if (e.target.closest('a') || e.target.closest('iframe')) return;
          openInNewTab(url);
        });

        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openInNewTab(url);
          }
        });
      };

      const stopClickBubble = (anchor) => {
        // Prevent tile click handler from also firing when CTA is clicked
        anchor.addEventListener('click', (e) => e.stopPropagation());
      };

      const renderEmbeddedTile = (resource) => {
        const tile = document.createElement('div');
        tile.className = 'resource-tile resource-tile--embedded';

        const content = document.createElement('div');
        content.className = 'resource-embedded-content';

        // Left: text column
        const text = document.createElement('div');
        text.className = 'resource-text';

        const title = document.createElement('div');
        title.className = 'resource-title';
        title.textContent = resource.title || '';
        text.appendChild(title);

        if (resource.meta) {
          const meta = document.createElement('div');
          meta.className = 'resource-meta';
          meta.textContent = resource.meta;
          text.appendChild(meta);
        }

        if (resource.description) {
          const desc = document.createElement('div');
          desc.className = 'resource-desc';
          desc.textContent = resource.description;
          text.appendChild(desc);
        }

        if (resource.link) {
          const cta = document.createElement('a');
          cta.href = resource.link;
          cta.target = '_blank';
          cta.rel = 'noopener noreferrer';
          cta.className = 'tile-link';
          cta.innerHTML = 'Visit <i class="bi bi-arrow-right"></i>';
          stopClickBubble(cta);
          text.appendChild(cta);
        }

        content.appendChild(text);

        // Right: iframe column
        const iframe = document.createElement('iframe');
        iframe.className = 'embedded-iframe';
        iframe.style.border = 'none';
        iframe.height = resource.iframeHeight || 300; // matches your CSS default
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer';
        iframe.src = resource.embed;
        iframe.title = resource.iframeTitle || resource.title || 'Embedded content';

        content.appendChild(iframe);
        tile.appendChild(content);

        // Make whole tile clickable (excluding iframe/CTA)
        makeClickable(tile, resource.link);

        return tile;
      };

      const renderSimpleTile = (resource) => {
        const tile = document.createElement('div');
        tile.className = 'resource-tile';

        const title = document.createElement('div');
        title.className = 'resource-title';
        title.textContent = resource.title || '';
        tile.appendChild(title);

        if (resource.meta) {
          const meta = document.createElement('div');
          meta.className = 'resource-meta';
          meta.textContent = resource.meta;
          tile.appendChild(meta);
        }

        if (resource.description) {
          const desc = document.createElement('div');
          desc.className = 'resource-desc';
          desc.textContent = resource.description;
          tile.appendChild(desc);
        }

        // Optional inline CTA (still make the tile clickable)
        if (resource.link) {
          const cta = document.createElement('a');
          cta.href = resource.link;
          cta.target = '_blank';
          cta.rel = 'noopener noreferrer';
          cta.className = 'tile-link';
          cta.innerHTML = 'Visit <i class="bi bi-arrow-right"></i>';
          stopClickBubble(cta);
          tile.appendChild(cta);
        }

        // Make whole tile clickable
        makeClickable(tile, resource.link);

        return tile;
      };

      // Render in desired order: embedded first, then normal
      embeddedItems.forEach(r => container.appendChild(renderEmbeddedTile(r)));
      normalItems.forEach(r => container.appendChild(renderSimpleTile(r)));
    })
    .catch(err => console.error('Failed to load resources:', err));
});
