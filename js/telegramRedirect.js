document.addEventListener("DOMContentLoaded", function () {
  const tg = window.Telegram.WebApp;
  const isTelegram = tg && tg.initData;

  // Замените это на URL вашей главной страницы (абсолютный или относительный)
  const MAIN_PAGE = '/index.html';

  if (isTelegram) {
    const current = window.location.pathname;

    // Если это не главная страница — редиректим
    if (current !== MAIN_PAGE) {
      window.location.replace(MAIN_PAGE);
    }
  }
});
