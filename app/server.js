const express = require('express');
const path = require('path');
const Database = require('better-sqlite3');

require('dotenv').config()

const DL_URL = process.env.DL_URL || null
const WIKI_URL = process.env.WIKI_URL || `http://adb.arcadeitalia.net/dettaglio_mame.php?game_name=$NAME`
const IMG_URL = process.env.ING_URL || null

if (!DL_URL || IMG_URL) {
  console.error('Please Provide an .env File with DL_URL and IMG_URL - Exiting');
  process.exit(42);
}

const URL_MAP = {
  dl: DL_URL,
  wiki: WIKI_URL,
  img: IMG_URL
};

const app = express();
const PORT = 3000;
const db = new Database(`${__dirname}/db/games.sqlite`, { readonly: true })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/redirect', async (req, res) => {
  const name = req.query.name;
  const type = req.query.type;

  if (!type || !['dl', 'wiki'].includes(type)) return res.status(400).send("Missing/Wrong Type");
  if (!name) return res.status(400).send("Missing name");

  res.redirect(URL_MAP[type].replace('$NAME', name)); 
});

// TODO check for response - if no response give back null image
app.get("/image", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).send("Missing Name");

  const url = URL_MAP.img.replace('$NAME', name);

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable"); 
    res.setHeader("Content-Type", response.headers.get("content-type") || "image/*");
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching image");
  }
});

app.get('/dropdowns', (req, res) => {
  const rows = db.prepare(`SELECT dataset, manufacturer FROM games`).all();

  const datasets = [...new Set(rows.map(r => r.dataset))];
  const manufacturers = [...new Set(rows.map(r => r.manufacturer))];

  res.json({ datasets, manufacturers });
});

app.get('/search', (req, res) => {
  const q = req.query.q
  if (!q || !q.trim()) {
    return res.status(400).json({ error: 'Query missing' })
  }

  const terms = q
    .trim()
    .split(/\s+/)
    .map(t => `"${t.replace(/"/g, '""')}"`)

  const matchQuery = terms.join(' ')

  const stmt = db.prepare(`
    SELECT
      g.*,
      bm25(games_fts, 15.0, 4.0, 3.0, 0.5) AS rank
    FROM games_fts
    JOIN games g ON games_fts.rowid = g.id
    WHERE games_fts MATCH ?
    ORDER BY
      rank ASC,
      g.year DESC
  `)

  res.json(stmt.all(matchQuery))
})


app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});

app.on("close", () => {
  db.close();
});
