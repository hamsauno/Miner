    document.addEventListener("wheel", function(event) {
        if (event.ctrlKey) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener("gesturestart", function(event) {
        event.preventDefault();
    });

document.addEventListener("DOMContentLoaded", function () {
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.expand(); // Разворачиваем мини-приложение
    }
});
