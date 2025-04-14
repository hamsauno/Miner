window.Telegram.WebApp.ready();

const tg = window.Telegram.WebApp;
const profileBlock = document.getElementById("profile");

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
  const user = tg.initDataUnsafe.user;

  profileBlock.innerHTML = `
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Username:</strong> @${user.username || "нет"}</p>
    <p><strong>Имя:</strong> ${user.first_name || "нет"}</p>
    <p><strong>Фамилия:</strong> ${user.last_name || "нет"}</p>
  `;
} else {
  profileBlock.innerHTML = `<p>⚠️ Нет данных о пользователе. Запусти мини-приложение из Telegram</p>`;
}
