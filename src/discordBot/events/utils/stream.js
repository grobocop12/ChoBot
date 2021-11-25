async function fetchStreamChannel(client) {
  const botRoomId = `913468442118606908`;
  const guildId = "87143400691728384";
  const guild = await client.guilds.fetch(guildId);
  return guild.channels.fetch(botRoomId);
}

module.exports = fetchStreamChannel;
