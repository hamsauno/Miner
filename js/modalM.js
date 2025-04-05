document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('product-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.querySelector('.close-button');

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Закрытие по клику вне контента
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Пример: добавим обработку клика по .item
  document.getElementById('container').addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) {
      modalBody.innerHTML = item.innerHTML; // Или подставь красивую верстку
      modal.style.display = 'block';
    }
  });
});
