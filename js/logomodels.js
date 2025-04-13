  document.addEventListener("DOMContentLoaded", () => {
    const manufacturers = [
      { name: "Antminer", img: "img/antminer.png" },
      { name: "Whatsminer", img: "img/whatsminer.png" },
      { name: "Canaan", img: "img/canaan.png" },
      { name: "Elphapex", img: "img/elphapex.png" },
    ];

    const container = document.getElementById("manufacturers");

    manufacturers.forEach(m => {
      const btn = document.createElement("button");
      btn.className = "manufacturer-btn flex flex-col items-center gap-1 text-white hover:opacity-80";
      btn.setAttribute("data-manufacturer", m.name);

      btn.innerHTML = `
        <img src="${m.img}" alt="${m.name}" class="w-20 h-20 object-contain">
        <span class="text-sm">${m.name}</span>
      `;

      container.appendChild(btn);
    });

    // Обработчик клика по производителям
    container.addEventListener("click", (e) => {
      const btn = e.target.closest(".manufacturer-btn");
      if (!btn) return;
      const selected = btn.getAttribute("data-manufacturer");

      // Здесь можешь вызвать функцию фильтрации моделей:
      filterModelsByManufacturer(selected);
    });
  });

  function filterModelsByManufacturer(manufacturer) {
    // Эта функция фильтрует модели по производителю
    // Добавь логику в зависимости от структуры твоих данных
    console.log("Выбран производитель:", manufacturer);
  }
