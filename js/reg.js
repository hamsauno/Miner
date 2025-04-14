document.addEventListener("DOMContentLoaded", () => {
  if (window.Telegram && Telegram.WebApp.initDataUnsafe.user) {
    const user = Telegram.WebApp.initDataUnsafe.user;
    document.getElementById("telegram_id").value = user.id;
    document.getElementById("telegram_username").value = user.username || "";
    document.getElementById("telegram_name").value = user.first_name + " " + (user.last_name || "");
  } else {
    alert("❌ Нет данных Telegram. Открой в Telegram WebApp.");
  }
});
