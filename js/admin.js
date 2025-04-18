const supabaseUrl = 'https://yiprwrgmyqlkdmhgulmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcHJ3cmdteXFsa2RtaGd1bG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjgsImV4cCI6MjA2MDIyODQ2OH0.lfiTfr5ukGDEVuwq-X9U2kWs3nEZrp3N443HT5AkbfI';
const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

async function fetchVisits() {
  const { data, error } = await supabaseClient
    .from('visits')
    .select('telegram_id, username, timestamp');
  if (error) {
    console.error('Ошибка при загрузке данных:', error.message);
    return;
  }
  renderTable(data);
  renderChart(data);
}

function renderTable(data) {
  const tableBody = document.getElementById('visitsTableBody');
  tableBody.innerHTML = '';
  data.forEach(visit => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${visit.telegram_id}</td>
      <td>${visit.username}</td>
      <td>${new Date(visit.timestamp).toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

function renderChart(data) {
  const chartData = {};
  data.forEach(visit => {
    const date = new Date(visit.timestamp).toLocaleDateString();
    chartData[date] = (chartData[date] || 0) + 1;
  });

  const labels = Object.keys(chartData);
  const values = Object.values(chartData);

  const ctx = document.getElementById('visitsChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Визиты по дням',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

document.addEventListener('DOMContentLoaded', fetchVisits);
