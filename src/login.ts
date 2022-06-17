import { Client, Intents } from 'discord.js';
import handler from './handler';

export default function start(BOT_TOKEN: string | undefined) {
	console.log('Bot is starting...');

	const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_VOICE_STATES,
			Intents.FLAGS.DIRECT_MESSAGES,
		],
		partials: ['CHANNEL', 'MESSAGE'],
	});

	client.login(BOT_TOKEN).catch(console.error);

	handler(client);
}
