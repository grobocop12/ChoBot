const { fetchTogetherLink } = require("../../commands/watchTogether");

async function handleMenuSelect(interaction) {
  if (interaction.customId === "select") {
    const invitationCode = await fetchTogetherLink(
      interaction.channel.id,
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
