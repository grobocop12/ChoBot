const { fetchTogetherLink } = require("../../commands/watchTogether");

async function handleMenuSelect(interaction) {
  if (interaction.customId === "select") {
    const invitationCode = await fetchTogetherLink(
      "297117889172078594",
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
