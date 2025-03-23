    Telegram.WebApp.ready(); // Инициализация WebApp
    Telegram.WebApp.BackButton.show(); // Показываем кнопку "Назад"

    // Обработчик нажатия кнопки "Назад"
    Telegram.WebApp.BackButton.onClick(function () {
        Telegram.WebApp.close(); // Закрытие приложения Telegram WebApp на мобильных устройствах
    });
