    Telegram.WebApp.ready(); // Инициализация WebApp
    Telegram.WebApp.BackButton.show(); // Показываем кнопку "Назад"

    // Обработчик нажатия кнопки "Назад"
    Telegram.WebApp.BackButton.onClick(function () {
        window.history.back(); // Возвращаемся назад в истории браузера
    });
