const play = require("./play");
const skip = require("./skip");
const { together } = require("./watchTogether");

const commands = [play, skip, together];

function registerCommands(client) {
  commands.forEach((command) => {
    client.commands.set(command.data.name, command);
  });
}

module.exports = registerCommands;
