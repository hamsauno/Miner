    Telegram.WebApp.ready(); // Инициализация WebApp после загрузки

    setTimeout(function() {
        // Скрытие кнопки «Назад» через 1 секунду
        if (Telegram.WebApp.isMobile) {
            Telegram.WebApp.BackButton.hide();
        }
    }, 1000); // Задержка в 1 секунду
