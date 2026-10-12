const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- CORRECTION ICI : On crée le dossier automatiquement ---
const dataDir = path.join(__dirname, 'data');
const dbPath = path.join(dataDir, 'db.json');

// Si le dossier data n'existe pas, on le crée
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('Dossier data créé:', dataDir);
}

// Si db.json n'existe pas, on le crée avec des données vides
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ events: [], tickets: [] }, null, 2));
  console.log('db.json créé');
}

function load() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  } catch (e) {
    return { events: [], tickets: [] };
  }
}

function save(data) {
  // Sécurité supplémentaire
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const tmpPath = dbPath + '.tmp';
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2));
  fs.renameSync(tmpPath, dbPath);
}

// Tes routes...
app.get('/api/events', (req, res) => {
  const db = load();
  res.json(db.events || []);
});

app.post('/api/events', (req, res) => {
  const db = load();
  db.events = db.events || [];
  db.events.push(req.body);
  save(db);
  res.json({ success: true });
});

// Laisse le reste de tes routes pareil, mais utilise load() et save()

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(OUAGA PASS lancé sur port ${PORT});
});
