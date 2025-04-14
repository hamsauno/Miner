let tg = window.Telegram.WebApp;
tg.ready();

let telegramData = tg.initDataUnsafe?.user || null;

// Показ формы регистрации
function showRegister() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("register").style.display = "block";
}

// Авторизация
function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        document.getElementById("auth").style.display = "none";
        document.getElementById("profile").style.display = "block";
        document.getElementById("profileName").textContent = username;
      } else {
        alert("Неверный логин или пароль");
      }
    });
}

// Регистрация
function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  fetch("register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      telegram_id: telegramData?.id,
      telegram_username: telegramData?.username,
      telegram_name: telegramData?.first_name
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("Регистрация успешна!");
        location.reload();
      } else {
        alert("Ошибка: " + data.message);
      }
    });
}
