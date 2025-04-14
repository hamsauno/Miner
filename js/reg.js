window.Telegram.WebApp.ready();
const initDataUnsafe = Telegram.WebApp.initDataUnsafe;

if (initDataUnsafe && initDataUnsafe.user) {
  fetch("https://legitmining.wuaze.com/save_telegram.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      telegram_id: initDataUnsafe.user.id,
      telegram_username: initDataUnsafe.user.username,
      telegram_name: initDataUnsafe.user.first_name,
    }),
  });
}
