        // Инициализация Telegram Web App
        window.Telegram.WebApp.init();

        // Подождите, пока WebView изменит размер, и затем разверните приложение
        window.Telegram.WebApp.onEvent('viewportChanged', function() {
            window.Telegram.WebApp.expand();  // Разворачиваем приложение на весь экран
        });
