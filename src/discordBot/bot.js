const { Client, Collection, Intents } = require("discord.js");
const { Player } = require("discord-player");
const handleMenuSelect = require("./events/eventHandlers/selectMenu");
const handleSlashCommands = require("./events/eventHandlers/slashCommands");
const registerEvents = require("./events/events");
const { registerCommands } = require("./commands/commands");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
const player = new Player(client);
client.commands = new Collection();

client.once("ready", () => {
  registerCommands(client);
  registerEvents(client);
  console.log('bot is up!');
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    await handleMenuSelect(interaction);
  }
  if (interaction.isCommand()) {
    await handleSlashCommands(interaction, client, player);
  }
});

module.exports = client;
