    // Пытаемся скрыть кнопку "Назад" только на мобильных устройствах
    if (Telegram.WebApp.isMobile) {
        Telegram.WebApp.BackButton.hide(); // Скрыть кнопку
    }

    // Если кнопка всё равно отображается, пробуем скрыть её с задержкой
    setTimeout(function() {
        Telegram.WebApp.BackButton.hide();
    }, 1000); // Задержка в 1 секунду
