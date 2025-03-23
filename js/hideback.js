    // Скрытие стандартной кнопки "Назад" (для мобильных)
    Telegram.WebApp.BackButton.hide();

    // Добавление пользовательской кнопки "Закрыть"
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Закрыть';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.left = '10px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';

    // Добавление кнопки на страницу
    document.body.appendChild(closeButton);

    // Логика для закрытия приложения при нажатии на кнопку "Закрыть"
    closeButton.addEventListener('click', function() {
        Telegram.WebApp.close(); // Закрытие мини-приложения
    });
