const { string } = require("joi");
const play = require("./play");
const skip = require("./skip");
const { together } = require("./watchTogether");

const commands = [play, skip, together];

const commandHandlers = new Map();
commandHandlers.set(play.data.name, play.execute);
commandHandlers.set(skip.data.name, skip.execute);
commandHandlers.set(together.data.name, together.execute);


function registerCommands(client) {
  const commandsData = commands.map((command) => command.data);
  client.guilds.cache.forEach((guild, key, map) => {
    guild.commands.set(commandsData);
  });
}

module.exports = { registerCommands, commandHandlers };