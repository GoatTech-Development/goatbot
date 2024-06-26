const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('control').setDescription('Start/Stop Gayme Server(s)'),
	// new SlashCommandBuilder().setName('start').setDescription('SELECT A GAME TO START, NERD'),
	// new SlashCommandBuilder().setName('stop').setDescription('SELECT A GAME TO STOP, NERD'),
	new SlashCommandBuilder().setName('info').setDescription('get info')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);