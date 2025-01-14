const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const BOT_TOKEN = '7657260386:AAE8_ExfxWv2uVEbOLF4Z3xf-38ba4fna7o';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.use(bodyParser.json());

app.post('/sendMessage', async (req, res) => {
  const { chatId, text } = req.body;

  if (!chatId || !text) {
    return res.status(400).json({ error: 'Параметры chatId и text обязательны' });
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Ошибка при отправке сообщения:', error);
    res.status(500).json({ error: 'Ошибка при отправке сообщения' });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});