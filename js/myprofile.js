import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://yiprwrgmyqlkdmhgulmc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcHJ3cmdteXFsa2RtaGd1bG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjgsImV4cCI6MjA2MDIyODQ2OH0.lfiTfr5ukGDEVuwq-X9U2kWs3nEZrp3N443HT5AkbfI"
);

document.addEventListener("DOMContentLoaded", async () => {
  const tg = window.Telegram?.WebApp;
  tg?.ready?.();

  const loadingEl = document.getElementById("loading");
  const profileView = document.getElementById("profileView");
  const telegramIdSpan = document.getElementById("telegram_id");
  const bonusEl = document.getElementById("bonus");
  const nameDisplay = document.getElementById("name_display");

  loadingEl.style.display = "flex";
  profileView.style.display = "none";

  try {
    const telegramUser = tg?.initDataUnsafe?.user;
    const telegramId = telegramUser?.id;
    const telegramName = telegramUser?.first_name || "Без имени";

    if (!telegramId) {
      alert("❗️ Telegram ID не найден. Запустите через Telegram WebApp.");
      loadingEl.style.display = "none";
      return;
    }

    telegramIdSpan.textContent = telegramId;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("telegram_id", telegramId.toString());

    if (error) throw error;

    if (data && data.length > 0) {
      const user = data[0];
      nameDisplay.textContent = user.name || telegramName;
      bonusEl.textContent = user.bonus ?? 0;
    } else {
      nameDisplay.textContent = telegramName;
      bonusEl.textContent = 0;
    }

    profileView.style.display = "block";
  } catch (err) {
    alert("Ошибка при инициализации: " + err.message);
  } finally {
    loadingEl.style.display = "none";
  }
});

