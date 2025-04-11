    let currentAlgorithm = '';

    function onAlgorithmChange() {
      const algorithm = document.getElementById('algorithmSelect').value;
      currentAlgorithm = algorithm;

      const manufacturerSelect = document.getElementById('manufacturerSelect');
      const modelSelect = document.getElementById('asicModel');
      const hashUnit = document.getElementById('hashUnit');

      modelSelect.innerHTML = '';
      manufacturerSelect.innerHTML = '';
      manufacturerSelect.disabled = false;
      modelSelect.disabled = true;

      if (algorithm === 'scrypt') {
        manufacturerSelect.innerHTML = `
          <option value="antminer">Bitmain Antminer</option>
          <option value="elphapex">Elphapex</option>
        `;
        hashUnit.textContent = 'GH/s';
      } else if (algorithm === 'sha256') {
        manufacturerSelect.innerHTML = `
          <option value="antminer">Bitmain Antminer</option>
          <option value="whatsminer">MicroBT Whatsminer</option>
          <option value="avalon">Canaan Avalon</option>
        `;
        hashUnit.textContent = 'TH/s';
      } else {
        manufacturerSelect.disabled = true;
        modelSelect.disabled = true;
        hashUnit.textContent = '';
      }
    }

    function updateModelList() {
      const manufacturer = document.getElementById('manufacturerSelect').value;
      const modelSelect = document.getElementById('asicModel');
      modelSelect.disabled = false;

      if (currentAlgorithm === 'scrypt') {
        if (window.loadModelsLTC) loadModelsLTC(manufacturer, modelSelect);
      } else if (currentAlgorithm === 'sha256') {
        if (window.loadModelsBTC) loadModelsBTC(manufacturer, modelSelect);
      }
    }

    function updateAsicSpecs() {
      const model = document.getElementById('asicModel').value;
      if (currentAlgorithm === 'scrypt') {
        if (window.setSpecsLTC) setSpecsLTC(model);
      } else if (currentAlgorithm === 'sha256') {
        if (window.setSpecsBTC) setSpecsBTC(model);
      }
    }

    function calculateProfit() {
      if (currentAlgorithm === 'scrypt') {
        if (window.calculateLTC) calculateLTC();
      } else if (currentAlgorithm === 'sha256') {
        if (window.calculateBTC) calculateBTC();
      }
    }
