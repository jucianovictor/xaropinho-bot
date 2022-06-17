import express, { Express } from 'express';
import { BOT_ID, BOT_TOKEN, PORT } from './config';
import start from './login';

const app: Express = express();

app.listen(PORT, () => {
	console.log(`⚡️[https://localhost:${PORT}]: Bot(${BOT_ID}) is starting...`);

	start(BOT_TOKEN);
});
