// Инициализация Supabase
const supabaseUrl = 'https://yiprwrgmyqlkdmhgulmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcHJ3cmdteXFsa2RtaGd1bG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjgsImV4cCI6MjA2MDIyODQ2OH0.lfiTfr5ukGDEVuwq-X9U2kWs3nEZrp3N443HT5AkbfI';

// Исправленная инициализация (без деструктуризации, так как supabase глобальный)
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Ожидаем полной загрузки страницы
document.addEventListener("DOMContentLoaded", async () => {
  if (window.Telegram && Telegram.WebApp) {
    const user = Telegram.WebApp.initDataUnsafe?.user;

    console.log("Пользователь из Telegram:", user);

    if (user) {
      // Получаем локальное время по Москве
      const moscowTime = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

      const { error, data } = await supabaseClient
        .from("visits")
        .insert([
          {
            telegram_id: user.id.toString(),
            username: user.username || "",
            timestamp: moscowTime
          }
        ]);

      if (error) {
        console.error("Ошибка при сохранении визита:", error.message);
      } else {
        console.log("Визит сохранён в Supabase", data);
      }
    }
  }
});
