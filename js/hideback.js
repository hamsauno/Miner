    Telegram.WebApp.ready(); // Инициализация WebApp после загрузки

    // Проверка, если пользователь на мобильном устройстве
    if (Telegram.WebApp.isMobile) {
        Telegram.WebApp.BackButton.hide(); // Скрытие кнопки "Назад" на мобильных устройствах
    }
