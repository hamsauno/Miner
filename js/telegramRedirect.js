(function () {
  // Если WebApp не инициализирован — ничего не делаем
  if (!window.Telegram || !Telegram.WebApp || !Telegram.WebApp.initData) return;

  const mainPath = '/index.html'; // <-- путь к главной странице (можешь изменить)
  const currentPath = window.location.pathname;

  // Если мы не на главной — делаем redirect
  if (!currentPath.endsWith(mainPath) && currentPath !== '/' && !currentPath.includes('index.html')) {
    window.location.replace(mainPath);
  }
})();
