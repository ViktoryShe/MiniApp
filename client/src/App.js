import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
    } else {
      console.error('Telegram WebApp API is not available.');
    }
  }, []);

  const sendMessage = async () => {
    const chatId = 406403160;
    const text = 'Привет от Telegram Mini App!';

    try {
      const response = await fetch('http://localhost:3001/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, text }),
      });
      const data = await response.json();
      console.log('Сообщение отправлено:', data);
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Добро пожаловать в Telegram Mini App!</h1>
        <button onClick={sendMessage}>Отправить сообщение</button>
        <button onClick={() => window.Telegram.WebApp.close()}>Закрыть</button>
      </header>
    </div>
  );
}

export default App;