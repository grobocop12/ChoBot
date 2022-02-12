const { fetchTogetherLink } = require("../../commands/watchTogether");

async function handleMenuSelect(interaction) {
  const channel = interaction.member.voice.channel;
  if (!channel) {
    await interaction.reply('Please, enter a voice channel and try again.');
    return;
  }
  if (interaction.customId === "select") {
    const invitationCode = await fetchTogetherLink(
      channel.id,
      interaction.values[0]
    );
    await interaction.deferUpdate();
    await interaction.editReply({
      content: `https://discord.com/invite/${invitationCode}`,
      components: [],
    });
  }
}

module.exports = handleMenuSelect;
