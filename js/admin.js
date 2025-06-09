
 


  window.Telegram.WebApp.ready();
  const tg = window.Telegram.WebApp;
  const userId = tg.initDataUnsafe?.user?.id;

  const admins = [1197645759, 626583205, 437559267, 93944036]; // замени на свой настоящий Telegram ID
  const isAdmin = admins.includes(userId);

  if (!isAdmin) {
    document.getElementById('adminBtn').style.display = 'none';
  }
