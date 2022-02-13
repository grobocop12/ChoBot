const { commandHandlers } = require('../../commands/commands');

const musicCommands = ["play", "fs"];

async function handleSlashCommands(interaction, client, player) {
  try {
    if (musicCommands.includes(interaction.commandName)) {
      await commandHandlers.get(interaction.commandName)(player, interaction);
      return;
    }
    await commandHandlers.get(interaction.commandName)(interaction);
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSlashCommands;
