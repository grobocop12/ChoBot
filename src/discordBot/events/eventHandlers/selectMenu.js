const { fetchTogetherLink } = require("../../commands/watchTogether");
const { fetchChannelsList } = require("../../commands/selectChannel");

async function handleMenuSelect(interaction) {
  if (interaction.customId === "selectTogether") {
    await fetchChannelsList(interaction, interaction.values[0])
  } else if (interaction.customId === "selectVoiceChannel") {
    const value = JSON.parse(interaction.values[0]);
    const invitationCode = await fetchTogetherLink(
      value.channelId,
      value.togetherCode
    );
    await interaction.deferUpdate();
    await interaction.editReply({
      content: `https://discord.com/invite/${invitationCode}`,
      components: [],
    });
  }
}

module.exports = handleMenuSelect;
