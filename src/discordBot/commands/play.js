const { SlashCommandBuilder } = require("@discordjs/builders");

async function execute(player, interaction) {
  const { options } = interaction;
  const query = options.getString("query");
  const queue = player.createQueue(interaction.guild, {
    metadata: {
      channel: interaction.channel,
    },
  });
  try {
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);
  } catch (err) {
    await queue.destroy();
    return interaction.reply({
      content: "Could not join your voice channel!",
      ephemeral: true,
    });
  }
  await interaction.deferReply();

  const track = await player
    .search(query, {
      requestedBy: interaction.user,
    })
    .then((x) => x.tracks[0]);
  if (!track) {
    return interaction.followUp({
      content: `Track **${query}** not found!`,
      ephemeral: true,
    });
  }

  await queue.play(track);
  return interaction.followUp({
    content: `Playing **${track.title}**!`,
  });
}

const playVideo = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays video at given YouTube url")
    .addStringOption((option) =>
      option.setName("query").setDescription("Video's URL").setRequired(true)
    ),
  execute,
};

module.exports = playVideo;
