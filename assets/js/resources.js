// Load resources from JSON and build resource tiles

document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/resources.json')
    .then(response => response.json())
    .then(resources => {
      const container = document.getElementById('resource-cards');
      if (!container) return;

      resources.forEach(resource => {
        const tile = document.createElement('a');
        tile.className = 'resource-tile';
        tile.href = resource.link;
        tile.target = '_blank';

        if (resource.type === 'whimsical' && resource.embed) {
          tile.classList.add('resource-tile--whimsical');

          const content = document.createElement('div');
          content.className = 'resource-whimsical-content';

          const text = document.createElement('div');
          text.className = 'resource-text';

          const title = document.createElement('div');
          title.className = 'resource-title';
          title.textContent = resource.title;
          text.appendChild(title);

          if (resource.meta) {
            const meta = document.createElement('div');
            meta.className = 'resource-meta';
            meta.textContent = resource.meta;
            text.appendChild(meta);
          }

          const desc = document.createElement('div');
          desc.className = 'resource-desc';
          desc.textContent = resource.description;
          text.appendChild(desc);

          content.appendChild(text);

          const iframe = document.createElement('iframe');
          iframe.className = 'whimsical-iframe';
          iframe.style.border = 'none';
          iframe.height = resource.iframeHeight || 300;
          iframe.src = resource.embed;
          content.appendChild(iframe);

          tile.appendChild(content);
        } else {
          const title = document.createElement('div');
          title.className = 'resource-title';
          title.textContent = resource.title;
          tile.appendChild(title);

          if (resource.meta) {
            const meta = document.createElement('div');
            meta.className = 'resource-meta';
            meta.textContent = resource.meta;
            tile.appendChild(meta);
          }

          const desc = document.createElement('div');
          desc.className = 'resource-desc';
          desc.textContent = resource.description;
          tile.appendChild(desc);
        }

        container.appendChild(tile);
      });
    })
    .catch(err => console.error('Failed to load resources:', err));
});
