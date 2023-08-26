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

	if (interaction.commandName === 'control') {
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('goatdays_start')
				.setLabel('Start Goatdays')
				.setStyle('PRIMARY'),
			new MessageButton()
				.setCustomId('goatdays_stop')
				.setLabel('Stop Goatdays')
				.setStyle('DANGER'),
		);
		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Start/Stop 7 Days to Die:')
			.setURL('https://goattech.net/bots')
			.setDescription('Scam da traders get the shmackers:');
		await interaction.reply({ 
            content: `yes melt my cpu wawaweewa`, 
            ephemeral: false, 
            components: [row], 
			embeds: [embed],
        });
	}

	if (interaction.commandName === 'info') {
		await interaction.reply('no u');
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	if (interaction.customId === "goatdays_start") {
		if (exec('docker ps | grep sdtd')) {
			await interaction.reply('Server already running, get out there and scam!');
			await wait(300000);
			await interaction.deleteReply();
		}
		else {
			await interaction.reply('Starting Goatdays, may you scam the traders and chug yucca smoothies');
			console.log('goatdays start clicked!');
			exec('cd /home/neal/goatdays/alpha21 && docker compose up -d');
			await wait(300000);
			await interaction.deleteReply();
		}
	}

	if (interaction.customId === "goatdays_stop") {
		if (exec('docker ps | grep sdtd')) {
			await interaction.reply('Stopping Goatdays, Trader Joel rejoices');
			console.log('goatdays stop clicked!');
			exec('cd /home/neal/goatdays/alpha21 && docker compose stop');
			await wait(300000);
			await interaction.deleteReply();
		}
		else {
			await interaction.reply('Server already stopped, come back to scam soon!');
			await wait(300000);
			await interaction.deleteReply();
		}
	}
});

// Login to Discord with your client's token
client.login(token);
