const supabaseUrl = 'https://yiprwrgmyqlkdmhgulmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcHJ3cmdteXFsa2RtaGd1bG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjgsImV4cCI6MjA2MDIyODQ2OH0.lfiTfr5ukGDEVuwq-X9U2kWs3nEZrp3N443HT5AkbfI'; // твой ключ

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  if (window.Telegram && Telegram.WebApp) {
    const user = Telegram.WebApp.initDataUnsafe?.user;

    console.log("Пользователь из Telegram:", user);

    if (user) {
      const { error, data } = await supabaseClient
        .from("visits")
        .insert([
          {
            telegram_id: user.id.toString(),
            username: user.username || "",
            timestamp: new Date().toISOString()
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
