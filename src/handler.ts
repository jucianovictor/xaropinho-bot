import { Client, Message } from 'discord.js';
import { xaropinhoCommands } from './commands/xaropinho-commands';
import { PREFIX } from './config';

export default function handler(client: Client) {
	console.log('Prefix is: '.concat(PREFIX));

	client.on('messageCreate', async message => {
		if (message.author.bot) return;

		pingPong(message);
		help(message);
		handleXaropinhoCommands(message);
	});

	client.on('ready', () => {
		console.log(`We have logged in as ${client.user?.tag}!`);
	});
}

const pingPong = (message: Message<boolean>) => {
	if (message.content.startsWith(PREFIX.concat('ping'))) {
		message.reply('pong');
	}
};

const help = (message: Message<boolean>) => {
	if (!message.content.startsWith(PREFIX.concat('help'))) return;
	message.reply(
		Object.keys(xaropinhoCommands)
			.map(c => `${PREFIX.concat(c)}`)
			.join('\n')
	);
};

const handleXaropinhoCommands = (message: Message<boolean>) => {
	const key = Object.keys(xaropinhoCommands).find(
		key => PREFIX.concat(key) === message.content
	);

	if (!key) return;

	message.reply(
		xaropinhoCommands[key].message + '\n' + xaropinhoCommands[key].url
	);
};
