    Telegram.WebApp.ready();
    Telegram.WebApp.expand(); // Открывает на весь экран

    Telegram.WebApp.disableVerticalSwipes();

const initData = Telegram.WebApp.initDataUnsafe;
console.log(initData.start_param); // Выведет "profit_calc"
