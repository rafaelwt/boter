const TelegramBot = require('node-telegram-bot-api');

// Reemplaza 'YOUR_TELEGRAM_BOT_TOKEN' por el token de tu bot
const bot = new TelegramBot('token', { polling: true });

// Escucha cualquier mensaje que llegue al bot
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Si el chat es un grupo, mostrará el ID del grupo
    console.log('Chat ID del grupo:', chatId);

    // Responde con el ID del grupo al grupo o usuario
    bot.sendMessage(chatId, `Este es el Chat ID del grupo: ${chatId}`);
});

// bot.sendMessage('', `Test bot`);
