const play = require("./play");
const skip = require("./skip");
const { together } = require("./watchTogether");

const commands = [play, skip, together];

function registerCommands(client) {
  const commandsData = commands.map((command) => command.data);
  client.guilds.cache.forEach((guild, key, map) => {
    guild.commands.set(commandsData);
  });
}

module.exports = { registerCommands, commands };