/* ---------- Fetch helper ---------- */
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json();
}


/* ---------- Fetch helper ---------- */
async function loadJSON(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  return res.json();
}