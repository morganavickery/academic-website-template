// js/navigation-content.js

async function loadAboutData(url = "assets/data/about.json") {
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

    // wrapper <p>
    const p = document.createElement("p");

    // <em> with type
    const em = document.createElement("em");
    em.textContent = c.type;

    // <strong id="contact-<type>">email</strong>
    const strong = document.createElement("strong");
    strong.id = `contact-${c.type.toLowerCase()}`;
    strong.textContent = c.email;

    // put them together
    p.appendChild(em);
    p.appendChild(document.createElement("br")); // << line break
    p.appendChild(strong);
    container.appendChild(p);
    container.appendChild(document.createElement("hr"));
  });
}

function initNavigationContent() {
  loadAboutData()
    .then((data) => populateContacts(data))
    .catch((err) => {
      console.error(err);
      const container = document.getElementById("contact-container");
      if (container) {
        container.innerHTML = "<p>Unable to load contact info.</p>";
      }
    });
}

document.addEventListener("DOMContentLoaded", initNavigationContent);
