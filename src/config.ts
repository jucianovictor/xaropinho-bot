import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const BOT_TOKEN = process.env.BOT_TOKEN;
const BOT_ID = process.env.DISCORD_APP_ID;
const PREFIX = process.env.PREFIX || '!';

export { PORT, BOT_TOKEN, BOT_ID, PREFIX };
