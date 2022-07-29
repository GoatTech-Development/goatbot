#!/usr/bin/env node

// Require the necessary discord.js classes
const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { exec } = require('child_process');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const wait = require('util').promisify(setTimeout);

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('GoatBot loaded and ready to oof!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'start') {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('goatheim_start')
				.setLabel('Start Goatheim')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('goatdays_start')
				.setLabel('Start Goatdays')
				.setStyle('DANGER'),
			new MessageButton()
				.setCustomId('goatcraft_start')
				.setLabel('Start Goatcraft')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('goatfactory_start')
				.setLabel('Start Goatfactory')
				.setStyle('SECONDARY'),
		);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Start GoatGame Containers:')
			.setURL('https://goattech.net/bots')
			.setDescription('Click which server to start:');
		await interaction.reply({ 
            content: `yes melt my cpu wawaweewa`, 
            ephemeral: false, 
            components: [row], 
			embeds: [embed],
        });
	}

	if (interaction.commandName === 'stop') {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('goatheim_stop')
				.setLabel('Stop Goatheim')
				.setStyle('SUCCESS'),
			new MessageButton()
				.setCustomId('goatdays_stop')
				.setLabel('Stop Goatdays')
				.setStyle('DANGER'),
			new MessageButton()
				.setCustomId('goatcraft_stop')
				.setLabel('Stop Goatcraft')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('goatfactory_stop')
				.setLabel('Stop Goatfactory')
				.setStyle('SECONDARY'),
		);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Stop GoatGame Containers:')
			.setURL('https://goattech.net/bots')
			.setDescription('Click which server to stop:');
		await interaction.reply({ 
            content: `ahhh my cpu is finally cooling down...`, 
            ephemeral: false, 
            components: [row], 
			embeds: [embed],
        });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId === "goatdays_start") {
		await interaction.reply('Started Goatdays, may you scam the traders and chug yucca smoothies');
		console.log('goatdays start clicked!');
		exec('cd /home/neal/goatdays && docker-compose up -d');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatheim_start") {
		await interaction.reply('Started Goatheim, may you vanquish the dastardly deathsquitos');
		console.log('goatheim start clicked!');
		exec('cd /home/neal/goatheim && docker-compose up -d');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatcraft_start") {
		await interaction.reply('Started Goatcraft, may you scam the villagers and abuse the chickens');
		console.log('goatcraft start clicked!');
		exec('cd /home/neal/goatcraft && docker-compose up -d');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatfactory_start") {
		await interaction.reply('Started Goatfactory, may your power grid never crash');
		console.log('goatfactory start clicked!');
		exec('cd /home/neal/goatfactory && docker-compose up -d');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatdays_stop") {
		await interaction.reply('Stopped Goatdays, Trader Joel rejoices');
		console.log('goatdays stop clicked!');
		exec('cd /home/neal/goatdays && docker-compose stop');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatheim_stop") {
		await interaction.reply('Stopped Goatheim, the greylings rejoice');
		console.log('goatheim stop clicked!');
		exec('cd /home/neal/goatheim && docker-compose stop');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatcraft_stop") {
		await interaction.reply('Stopped Goatcraft, the abused villagers rejoice');
		console.log('goatcraft stop clicked!');
		exec('cd /home/neal/goatcraft && docker-compose stop');
		await wait(300000);
		await interaction.deleteReply();
	}

	if (interaction.customId === "goatfactory_stop") {
		await interaction.reply('Stopped Goatfactory, the power grid rests...');
		console.log('goatfactory stop clicked!');
		exec('cd /home/neal/goatfactory && docker-compose stop');
		await wait(300000);
		await interaction.deleteReply();
	}
});

// Login to Discord with your client's token
client.login(token);
