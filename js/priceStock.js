
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

div.innerHTML = `<p>${model} ${hash} ${unit} — ${rubFormatted} ₽</p>`;
       setTimeout(() => {
       div.classList.remove("opacity-0", "scale-95");
       div.classList.add("opacity-100", "scale-100");
       }, 50);

div.addEventListener('click', () => {
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");

  const telegramLink = `https://t.me/LEGIT_Mining_APP_Bot?start=main_5765882132`;

  const gtdPrice = item["Цена ГТД РФ"];
  const gtdNdsPrice = item["Цена с ГТД РФ и НДС"];

  // Проверим, выбрана ли категория "Предзаказ"
  const isPreorder = type === 'Предзаказ';

  let gtdHTML = '';
  if (isPreorder && (gtdPrice || gtdNdsPrice)) {
    const gtdPriceFormatted = gtdPrice ? `${Math.ceil((parseFloat(gtdPrice) * priceUSDT) / 100) * 100} ₽ (${gtdPrice} $)` : '';
    const gtdNdsPriceFormatted = gtdNdsPrice ? `${Math.ceil((parseFloat(gtdNdsPrice) * priceUSDT) / 100) * 100} ₽ (${gtdNdsPrice} $)` : '';
    gtdHTML = `
      ${gtdPrice ? `<p><strong>Цена ГТД РФ:</strong> ${gtdPriceFormatted}</p>` : ''}
      ${gtdNdsPrice ? `<p><strong>С ГТД РФ и НДС:</strong> ${gtdNdsPriceFormatted}</p>` : ''}
    `;
  }

  modalBody.innerHTML = `
      <h2 style="font-weight: bold; font-size: 1.25rem;">${manufacturer} ${model}</h2>
      <p><strong>Хешрейт:</strong> ${hash} ${unit}</p>
      <p><strong>Потребление:</strong> ${power} Вт</p>
      <p><strong>Цена ГТД РФ:</strong> ${rubFormatted} ₽ (${usd} $)</p>
      <p><strong>Цена с НДС:</strong> ${ndsRub.toLocaleString('ru-RU')} ₽</p>
      ${gtdHTML}
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


