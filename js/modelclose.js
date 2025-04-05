document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-button');
    let isModalOpen = false; // Флаг, чтобы отслеживать, открыт ли модал

    // Закрытие при клике на кнопку "×"
    closeBtn.addEventListener('click', () => {
        if (isModalOpen) {
            modal.classList.remove('show');
            isModalOpen = false;
        }
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal && isModalOpen) {
            modal.classList.remove('show');
            isModalOpen = false;
        }
    });
