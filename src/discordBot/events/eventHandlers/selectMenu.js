const { fetchTogetherLink } = require("../../commands/watchTogether");

const channelId = process.env.CHANNEL_ID;

async function handleMenuSelect(interaction) {
  if (interaction.customId === "select") {
    const invitationCode = await fetchTogetherLink(
      channelId,
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
