document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-button');

    // Закрытие при клике на кнопку "×"
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Закрытие при клике вне модального окна (или на мобильных устройствах)
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Для мобильных устройств добавим обработчики для касания
    modal.addEventListener('touchstart', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    closeBtn.addEventListener('touchstart', () => {
        modal.classList.remove('show');
    });
});
