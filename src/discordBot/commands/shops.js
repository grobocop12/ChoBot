const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders");
const axios = require("axios").default;

async function execute(interaction) {
  await interaction.deferReply();
  const { options } = interaction;
  const onlyFavorites = options.getBoolean("favourites");

  const { data: shopsData } = await axios.get(
    `http://localhost:4000/api/items${onlyFavorites ? "?isFavorite=true" : ""}`
  );

  const payloadString = shopsData
    .map(
      (shop) =>
        `"${shop.name}" has ${shop.itemsCount} item${
          shop.itemsCount !== 1 ? "s" : ""
        } available.`
    )
    .join("\n");

  await interaction.editReply({
    content: codeBlock("js", payloadString),
    ephemeral: true,
  });
}

const showShops = {
  data: new SlashCommandBuilder()
    .setName("sklepy")
    .setDescription("Replies with a list of watched 2good2go shops")
    .addBooleanOption((option) =>
      option.setName("favourites").setDescription("Show only favourite shops")
    ),
  execute,
};

module.exports = showShops;
