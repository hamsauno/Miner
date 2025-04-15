(function () {
  const tg = window.Telegram?.WebApp;
  const mainPage = '/index.html';
  const current = window.location.pathname;

  // Если внутри Telegram и НЕ на главной — редиректим
  if (tg && tg.initData && !current.endsWith(mainPage) && current !== '/') {
    window.location.replace(mainPage);
  }
})();
