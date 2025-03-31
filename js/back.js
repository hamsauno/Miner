Telegram.WebApp.ready(); // Инициализация WebApp

// Проверяем, поддерживается ли BackButton
if (Telegram.WebApp.version && parseFloat(Telegram.WebApp.version) >= 6.1) {
    Telegram.WebApp.BackButton.show(); // Показываем кнопку "Назад"

    // Обработчик нажатия кнопки "Назад"
    Telegram.WebApp.BackButton.onClick(function () {
        window.history.back(); // Возвращаемся назад в истории браузера
    });
} else {
    console.warn("BackButton не поддерживается в этой версии Telegram Web Apps.");
}
