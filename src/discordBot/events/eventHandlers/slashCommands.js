async function handleSlashCommands(interaction, client, player) {
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  const musicCommands = ["play", "fs"];
  try {
    if (musicCommands.includes(command.data.name)) {
      await command.execute(player, interaction);
      return;
    }
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleSlashCommands;
