const { SlashCommandBuilder } = require("@discordjs/builders");

async function execute(player, interaction) {
  await interaction.deferReply({ ephemeral: true });

  const queue = await player.getQueue(interaction.guild.id);
  if (!queue)
    return interaction.followUp({
      content: "Nothing is playing at the moment",
    });

  await interaction.followUp({
    content: `Skipped ${queue.current}`,
  });
  return queue.skip();
}

const skip = {
  data: new SlashCommandBuilder()
    .setName("fs")
    .setDescription("Skips currently playing video"),
  execute,
};

module.exports = skip;
