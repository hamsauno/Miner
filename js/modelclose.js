document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-button');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
