        // Функция для обработки события изменения ориентации устройства
        function handleOrientation(event) {
            // Получаем данные с устройства
            const beta = event.beta;  // Наклон по оси X (вверх/вниз)
            const gamma = event.gamma;  // Наклон по оси Y (влево/вправ)

            // Ограничиваем значения, чтобы избежать слишком больших изменений
            const x = Math.min(Math.max(gamma, -45), 45); // Положение по оси X
            const y = Math.min(Math.max(beta, -45), 45);  // Положение по оси Y

            // Изменяем позицию фона в зависимости от наклона устройства
            document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
        }

        // Добавляем обработчик события изменения ориентации устройства
       if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation, false);
        } else {
            alert('Ваше устройство не поддерживает ориентацию.');
        }
