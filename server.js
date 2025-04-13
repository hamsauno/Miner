require('dotenv').config(); // ← Добавить в начале

const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
const PORT = 3000;

// Подключение к MongoDB из .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB подключена'))
  .catch((err) => console.error('Ошибка подключения:', err));

app.use(express.json());
app.use(express.static('public'));

// Роут регистрации
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email уже зарегистрирован' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Пользователь зарегистрирован' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
