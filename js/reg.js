window.Telegram.WebApp.ready();

const tg = window.Telegram.WebApp;
const profileBlock = document.getElementById("profile");

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;

  console.log("✅ Данные Telegram получены:");
  console.log(user); // Это можно будет увидеть в консоли

  profileBlock.innerHTML = `
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Username:</strong> @${user.username || "нет"}</p>
    <p><strong>Имя:</strong> ${user.first_name || "нет"}</p>
  `;
} else {
  console.log("❌ Нет данных Telegram. Возможно, скрипт открыт вне Telegram WebApp.");
  profileBlock.innerHTML = `<p>⚠️ Открой мини-приложение через Telegram</p>`;
}
