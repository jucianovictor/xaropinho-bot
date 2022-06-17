import {
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
	NoSubscriberBehavior,
} from '@discordjs/voice';
import { Client, Message } from 'discord.js';
import play from 'play-dl';
import { xaropinhoCommands } from './commands/xaropinho-commands';
import { PREFIX } from './config';

export default function handler(client: Client) {
	console.log('Prefix is: '.concat(PREFIX));

	client.on('messageCreate', async message => {
		if (message.author.bot) return;

		pingPong(message);
		help(message);
		handleXaropinhoSongs(message);
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

const handleXaropinhoSongs = async (message: Message<boolean>) => {
	const key = Object.keys(xaropinhoCommands).find(
		key => PREFIX.concat(key) === message.content
	);

	if (!key || !message.guild) return;

	if (!message.member?.voice.channel)
		return message.channel.send('Connect to a Voice Channel!');

	const voiceChannelConnection = joinVoiceChannel({
		channelId: message.member.voice.channel.id,
		guildId: message.guild.id,
		adapterCreator: message.guild.voiceAdapterCreator,
	});

	const stream = await play.stream(xaropinhoCommands[key].url);

	const resource = createAudioResource(stream.stream, {
		inputType: stream.type,
	});

	const player = createAudioPlayer({
		behaviors: {
			noSubscriber: NoSubscriberBehavior.Play,
		},
	});

	player.play(resource);
	voiceChannelConnection.subscribe(player);

	message.reply(xaropinhoCommands[key].message);
};
