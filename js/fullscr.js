        // Инициализация Telegram Web App
        window.Telegram.WebApp.init();

        // Запрос на использование полноэкранного режима
        window.Telegram.WebApp.expand();

        // После инициализации можно управлять состоянием приложения
        window.Telegram.WebApp.onEvent('viewportChanged', function() {
            // Действия при изменении размера экрана, если нужно
        });
