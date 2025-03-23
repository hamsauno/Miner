import asyncio
import json
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton

TOKEN = "7973202415:AAE2otWXvbDNm1fiAhfpZrvJ0KIsa1AdSZM"  # Замени на свой токен
ADMIN_ID = "1197645759"  # Замени на свой Telegram ID
USERS_FILE = "users.json"  # Файл для хранения пользователей

bot = Bot(token=TOKEN)
dp = Dispatcher()

# Функция для загрузки списка пользователей
def load_users():
    try:
        with open(USERS_FILE, "r") as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Функция для сохранения списка пользователей
def save_users(users):
    with open(USERS_FILE, "w") as file:
        json.dump(users, file)

@dp.message(Command("start"))
async def start(message: types.Message):
    users = load_users()
    user_id = message.from_user.id

    # Добавляем пользователя, если его ещё нет в списке
    if user_id not in users:
        users.append(user_id)
        save_users(users)

    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[[
            InlineKeyboardButton(text="ОТКРЫТЬ", web_app=WebAppInfo(url="https://hamsauno.github.io/Miner/calc.html"))
        ]]
    )

    # Этот блок должен иметь правильный отступ
    await message.answer(
        f"Тыкай и погнали! 🔥\nСейчас в сети {len(users)} пользователей.", 
        reply_markup=keyboard
    )

    # Отправляем админу уведомление о новом пользователе
    await bot.send_message(ADMIN_ID, f"👤 Новый пользователь: {message.from_user.first_name} ({user_id})")

# Обработчик всех остальных сообщений
@dp.message()
async def handle_message(message: types.Message):
    log_text = f"[{message.from_user.id}] {message.from_user.first_name}: {message.text}"
    print(log_text)

    # Отправляем сообщение админу
    await bot.send_message(ADMIN_ID, log_text)

    await message.answer("Сообщение получено!")

async def main():
    print("✅ Бот запущен и готов к работе!")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
    asyncio.run(main())
