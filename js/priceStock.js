
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
    btn.className = "bg-gradient-to-r from-[#F6A314] to-[#EC7E07] text-black font-bold py-2 px-3 rounded text-center hover:opacity-90 w-full";
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
    div.className = "item bg-[#333333] p-4 rounded shadow cursor-pointer text-white text-sm transform opacity-0 scale-95 transition-all duration-300";

    const model = item["Модель"] || "Неизвестно";
    const hash = item["Хешрейт"];
    const unit = item["Ед. изм."];
    const power = Math.round(item["Потребление"]);
    const usd = parseFloat(item["Цена"]) || 0;
    const rub = Math.ceil((usd * priceUSDT) / 100) * 100;
    const rubFormatted = rub.toLocaleString('ru-RU');
    const ndsUsd = Math.ceil((usd * 1.2) / 10) * 10;
    const ndsRub = Math.ceil((ndsUsd * priceUSDT) / 100) * 100;

div.addEventListener('click', () => {
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");

  const telegramLink = `https://t.me/LEGIT_Mining_APP_Bot?start=main_5765882132`;

  modalBody.innerHTML = `
    <div style="
      background-color: #222222;
      border: 1px solid;
      border-image: linear-gradient(90deg, #F6A314, #EC7E07) 1;
      padding: 16px;
      border-radius: 8px;
      color: white;
    ">
      <h2 style="font-weight: bold; font-size: 1.25rem;">${manufacturer} ${model}</h2>
      <p><strong>Хешрейт:</strong> ${hash} ${unit}</p>
      <p><strong>Потребление:</strong> ${power} Вт</p>
      <p><strong>Цена:</strong> ${rubFormatted} ₽ (${usd} $)</p>
      <p><strong>Цена с НДС:</strong> ${ndsRub.toLocaleString('ru-RU')} ₽ (${ndsUsd} $)</p>
      <a href="${telegramLink}" class="buy-button" target="_blank" style="
        display: inline-block;
        margin-top: 16px;
        padding: 10px 20px;
        color: black;
        font-weight: bold;
        text-align: center;
        border-radius: 6px;
        background: linear-gradient(90deg, #F6A314, #EC7E07);
        text-decoration: none;
      ">Хочу купить</a>
    </div>
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


