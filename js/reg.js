const tg = window.Telegram.WebApp;
const u = tg.initDataUnsafe.user;

fetch("https://legitmining.wuaze.com/save_user.php", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    telegramId: u.id,
    username: u.username,
    firstName: u.first_name,
    lastName: u.last_name,
  }),
})
.then(res => res.json())
.then(data => console.log("Saved:", data));
