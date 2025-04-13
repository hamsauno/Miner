const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // для фронтенда

const FILE_PATH = './profiles.json';

// Получение профиля по Telegram ID
app.get('/api/get-profile', (req, res) => {
  const userId = parseInt(req.query.userId);
  if (!fs.existsSync(FILE_PATH)) return res.json(null);

  const profiles = JSON.parse(fs.readFileSync(FILE_PATH));
  const profile = profiles.find(p => p.userId === userId);
  res.json(profile || null);
});

// Сохранение / обновление профиля
app.post('/api/save-profile', (req, res) => {
  const { userId, fullName, phone } = req.body;

  let profiles = [];
  if (fs.existsSync(FILE_PATH)) {
    profiles = JSON.parse(fs.readFileSync(FILE_PATH));
  }

  const existingIndex = profiles.findIndex(p => p.userId === userId);
  if (existingIndex !== -1) {
    profiles[existingIndex] = { userId, fullName, phone };
  } else {
    profiles.push({ userId, fullName, phone });
  }

  fs.writeFileSync(FILE_PATH, JSON.stringify(profiles, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));
