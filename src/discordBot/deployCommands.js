const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { commands } = require("./commands/commands");
const {
  clientId,
  guildId,
  token,
  devGuildId,
} = require("../../config/discord");

const commandsJson = commands.map((command) => command.data.toJSON());

const rest = new REST({ version: "9" }).setToken(token);
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), {
    body: commandsJson,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

rest
  .put(Routes.applicationGuildCommands(clientId, devGuildId), {
    body: commandsJson,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
