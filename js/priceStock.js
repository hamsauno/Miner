
let priceUSDT = 0;
let allData = {};

fetch('https://hamsauno.github.io/Miner/kursBTC.txt')
  .then(res => res.text())
  .then(text => {
    const lines = text.split('\n');
    if (lines.length > 1) {
      priceUSDT = parseFloat(lines[1].trim());
      loadAllData();
    }
  });

function loadAllData() {
  fetch('https://hamsauno.github.io/Miner/json/data.json')
    .then(res => res.json())
    .then(data => {
      allData = data;
    });
}

document.querySelectorAll('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    showManufacturers(type);
  });
});

function showManufacturers(type) {
  const manufacturersDiv = document.getElementById('manufacturers');
  const modelsDiv = document.getElementById('models');
  manufacturersDiv.innerHTML = '';
  modelsDiv.innerHTML = '';

  const data = allData[type];
  if (!data) return;

  const manufacturers = [...new Set(data.map(item => item["Производитель"]))];

  manufacturers.forEach(m => {
    const btn = document.createElement('button');
    btn.className = "bg-gradient-to-r from-[#F6A314] to-[#EC7E07] text-black font-bold px-4 py-2 rounded flex-1 min-w-[120px] text-center hover:opacity-90";
    btn.innerText = m;
    btn.addEventListener('click', () => showModels(type, m));
    manufacturersDiv.appendChild(btn);
  });
}

function showModels(type, manufacturer) {
  const modelsDiv = document.getElementById('models');
  modelsDiv.innerHTML = '';
  const data = allData[type];
  const filtered = data.filter(item => item["Производитель"] === manufacturer);

  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = "item bg-[#333333] p-4 rounded shadow cursor-pointer text-white";

    const model = item["Модель"] || "Неизвестно";
    const hash = item["Хешрейт"];
    const unit = item["Ед. изм."];
    const power = item["Потребление"];
    const usd = parseFloat(item["Цена"]) || 0;
    const rub = Math.ceil((usd * priceUSDT) / 100) * 100;
    const rubFormatted = rub.toLocaleString('ru-RU');
    const ndsUsd = Math.ceil((usd * 1.2) / 10) * 10;
    const ndsRub = Math.ceil((ndsUsd * priceUSDT) / 100) * 100;

    div.innerHTML = `<p>${model} ${hash} ${unit} — ${rubFormatted} ₽ | ${usd} $</p>`;
    div.addEventListener('click', () => {
      const modal = document.getElementById("product-modal");
      const modalBody = document.getElementById("modal-body");

      const telegramLink = `https://t.me/LEGIT_Mining_APP_Bot?start=main_5765882132`;

      modalBody.innerHTML = `
        <h2>${manufacturer} ${model}</h2>
        <p><strong>Хешрейт:</strong> ${hash} ${unit}</p>
        <p><strong>Потребление:</strong> ${power} Вт</p>
        <p><strong>Цена:</strong> ${rubFormatted} ₽ (${usd} $)</p>
        <p><strong>Цена с НДС:</strong> ${ndsRub.toLocaleString('ru-RU')} ₽ (${ndsUsd} $)</p>
        <a href="${telegramLink}" class="buy-button bg-blue-500 text-white px-4 py-2 rounded inline-block mt-4" target="_blank">Хочу купить</a>
      `;
      modal.style.display = "flex";
    });

    modelsDiv.appendChild(div);
  });
}
document.getElementById("product-modal").addEventListener('click', e => {
  if (e.target.id === "product-modal") {
    e.currentTarget.style.display = "none";
  }
});

