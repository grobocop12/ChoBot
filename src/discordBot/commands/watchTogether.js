const { default: axios } = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

const { token } = require("../../../config/discord");

const togetherCodes = {
  youtube: "880218394199220334",
  youtubedev: "880218832743055411",
  poker: "755827207812677713",
  betrayal: "773336526917861400",
  fishing: "814288819477020702",
  chess: "832012774040141894",
  chessdev: "832012586023256104",
  lettertile: "879863686565621790",
  wordsnack: "879863976006127627",
  doodlecrew: "878067389634314250",
  awkword: "879863881349087252",
  spellcast: "852509694341283871",
  checkers: "832013003968348200",
  puttparty: "763133495793942528",
};

async function fetchTogetherLink(channelId, gameId) {
  const axiosInstace = axios.create({
    baseURL: "https://discord.com/",
    timeout: 1000,
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
  });
  try {
    const res = await axiosInstace.post(
      `api/v8/channels/${channelId}/invites`,
      {
        max_age: 86400,
        max_uses: 0,
        target_application_id: gameId,
        target_type: 2,
        temporary: false,
        validate: null,
      }
    );
    return res.data.code;
  } catch (error) {
    return console.error(error);
  }
}

async function execute(interaction) {
  const row = new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId("selectTogether")
      .setPlaceholder("Nothing selected")
      .addOptions([
        {
          label: "Youtube",
          description: "Youtube",
          value: togetherCodes.youtube,
        },
        {
          label: "Chess",
          description: "Chess",
          value: "832012774040141894",
        },
        {
          label: "Spellcast",
          description: "Scrabble",
          value: "852509694341283871",
        },
        {
          label: "LetterTile",
          description: "Nw",
          value: togetherCodes.lettertile,
        },
        {
          label: "Poker",
          description: "Zagraj o ogromne pieniadze",
          value: togetherCodes.poker,
        },
        {
          label: "Doodlecrew",
          description: "Kalambury",
          value: togetherCodes.doodlecrew,
        },
        {
          label: "WordSnack",
          description: "Nw",
          value: togetherCodes.wordsnack,
        },
        {
          label: "Puttparty",
          description: "Nw",
          value: togetherCodes.puttparty,
        },
        {
          label: "YoutubeDev",
          description: "YoutubeDev",
          value: "880218832743055411",
        },
      ]));
  await interaction.reply({
    content: "Select Discord Together Option",
    components: [row],
  });
}

const together = {
  data: new SlashCommandBuilder()
    .setName("together")
    .setDescription("Don't forget to slam on every single link button."),
  execute,
};

module.exports = { together, fetchTogetherLink };
