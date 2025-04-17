// myprofile.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://yiprwrgmyqlkdmhgulmc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

    nameDisplay.textContent = telegramName;
    bonusEl.textContent = data[0]?.bonus ?? 0;
    profileView.style.display = "block";
  } catch (err) {
    alert("Ошибка: " + err.message);
  } finally {
    loadingEl.style.display = "none";
  }
});

