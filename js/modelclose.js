document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-button');

    // Закрытие при клике на кнопку "×"
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Флаг, чтобы избежать лишних срабатываний при быстром касании
    let isTouch = false;

    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal && !isTouch) {
            modal.classList.remove('show');
        }
    });

    // Закрытие при касании (touchstart) — только на мобильных устройствах
    modal.addEventListener('touchstart', (e) => {
        isTouch = true; // Помечаем, что касание произошло
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Возвращаем флаг в исходное состояние после касания
    modal.addEventListener('touchend', () => {
        setTimeout(() => {
            isTouch = false;
        }, 200);  // После касания сбрасываем флаг через короткую задержку
    });
});
