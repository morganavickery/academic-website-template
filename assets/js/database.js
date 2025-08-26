document.addEventListener("DOMContentLoaded", function () {
  let database = [];

  // Load and parse the CSV database, then display cards
  async function loadDatabase() {
    const response = await fetch("assets/uploads/database.csv");
    const text = await response.text();

    // Decode as UTF-8 to handle special characters
    const utf8decoder = new TextDecoder("utf-8");
    const decodedText = utf8decoder.decode(new TextEncoder().encode(text));
    const rows = decodedText.trim().split("\n").slice(1); // Skip header

    database = rows
      .map((row) => {
        const columns = parseCSVRow(row);
        if (columns.length < 5) return null;
        return {
          date: columns[0].trim(),
          authors: decodeEntities(columns[1].trim()),
          title: decodeEntities(columns[2].trim()),
          venue: decodeEntities(columns[3].trim()),
          link: columns[4].trim(),
        };
      })
      .filter((item) => item !== null);

    displayCards();
  }

  // Parse a single CSV row, handling quoted fields and commas
  function parseCSVRow(row) {
    const result = [];
    let current = "";
    let insideQuotes = false;
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"' && row[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  }

  // Render publication cards from the database array
function displayCards() {
  // Get the container where cards will be displayed
  let container = document.getElementById("database-cards");
  container.innerHTML = "";

  // -----------------------------
  // SORTING LOGIC
  // -----------------------------

  // Helper: Try to parse a date string into a Date object
  const parseDate = (str) => {
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d;
  };

  // Helper: Assign a numeric rank for sorting
  const rank = (entry) => {
    if (/defended/i.test(entry.date)) return 0;   // Highest priority
    if (parseDate(entry.date)) return 1;          // Middle priority
    return 2;                                     // Lowest (e.g., "In Progress")
  };

  // Main sort: by rank first, then by actual date if applicable
  database.sort((a, b) => {
    const rankA = rank(a);
    const rankB = rank(b);

    if (rankA !== rankB) return rankA - rankB;

    // If both are ranked as real dates, sort descending (most recent first)
    if (rankA === 1) {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB - dateA;
    }

    // Same rank and not valid dates — preserve original order
    return 0;
  });

  // -----------------------------
  // CARD RENDERING LOGIC
  // -----------------------------

  database.forEach((item) => {
    let flagHTML = "";
    let card = document.createElement("div");
    card.className = "database-card";

    // Clean up and prepare link
    let rawLink = item.link || "";
    let url = rawLink.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

    // If valid link, make the card clickable
    if (/^https?:\/\//i.test(url)) {
      console.log(`[FLAG] Added for: ${item.title}`);
      card.addEventListener("click", () => window.open(url, "_blank"));
      flagHTML = `<div class="doi-flag">Access Paper</div>`;
    }

    // Determine if the venue field is empty
    let isVenueEmpty = !item.venue || item.venue.trim() === "";

    // Remove any surrounding quotes from the title
    let cleanTitle = item.title.replace(/^"(.*)"$/, "$1");

    // Bold "Vickery, M." wherever it appears in authors
    let highlightedAuthors = item.authors.replace(
      /Vickery, M\./g,
      '<span style="font-weight: 600;">Vickery, M.</span>'
    );

    // Show venue or fallback text
    let venueText = isVenueEmpty ? "Manuscript In Progress" : item.venue;

    // Assemble card HTML
    card.innerHTML = `
      <div class="card-header">
        <div class="card-year"><strong>${item.date}</strong></div>
        ${flagHTML}
      </div>
      <div class="card-title">${cleanTitle}</div>
      <div class="card-authors">${highlightedAuthors}</div>
      <div class="card-venue">${venueText}</div>
    `;

    // Append to the container
    container.appendChild(card);
  });
}


  // Decode HTML entities for special characters
  function decodeEntities(encodedString) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Initialize database loading
  loadDatabase();
});

  function decodeEntities(encodedString) {
    let textarea = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  // Initialize
  loadDatabase();