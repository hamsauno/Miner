    import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

    const supabase = createClient(
      "https://yiprwrgmyqlkdmhgulmc.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpcHJ3cmdteXFsa2RtaGd1bG1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NTI0NjgsImV4cCI6MjA2MDIyODQ2OH0.lfiTfr5ukGDEVuwq-X9U2kWs3nEZrp3N443HT5AkbfI"
    );

    document.addEventListener("DOMContentLoaded", async () => {
      const tg = window.Telegram?.WebApp;
      tg?.ready?.();

      const loadingEl = document.getElementById("loading");
      const formEl = document.getElementById("registerForm");
      const profileView = document.getElementById("profileView");
      const telegramIdSpan = document.getElementById("telegram_id");
      const nameInput = document.getElementById("name");
      const birthdateInput = document.getElementById("birthdate");
      const saveButton = document.getElementById("save-button");
      const notificationEl = document.getElementById("notification");
      const bonusEl = document.getElementById("bonus");
      const nameDisplay = document.getElementById("name_display");

      loadingEl.style.display = "flex";
      formEl.style.display = "none";
      profileView.style.display = "none";

      try {
        const telegramUser = tg?.initDataUnsafe?.user;
        const telegramId = telegramUser?.id;

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
          nameDisplay.textContent = user.name || "Без имени";
          bonusEl.textContent = user.bonus ?? 0;
          profileView.style.display = "block";
        } else {
          formEl.style.display = "block";
        }
      } catch (err) {
        alert("Ошибка при инициализации: " + err.message);
      } finally {
        loadingEl.style.display = "none";
      }

      // Сохранение данных
      saveButton.addEventListener("click", async () => {
        const name = nameInput.value.trim();
        const birthdate = birthdateInput.value;
        const telegramId = telegramIdSpan.textContent;

        if (!name || !birthdate) {
          alert("Пожалуйста, заполните все поля.");
          return;
        }

        const { error } = await supabase.from("users").insert([{
          telegram_id: telegramId,
          name,
          birthdate,
          bonus: 0
        }]);

        if (error) {
          alert("Ошибка при сохранении: " + error.message);
          return;
        }

        notificationEl.classList.remove("hidden");
        setTimeout(() => {
          notificationEl.classList.add("hidden");
          location.reload(); // Перезагрузим, чтобы показать профиль
        }, 2000);
      });
    });
