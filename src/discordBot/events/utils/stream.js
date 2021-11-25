async function fetchStreamChannel(client) {
  const botRoomId = `887380369282830396`;
  const guildId = "87143400691728384";
  const guild = await client.guilds.fetch(guildId);
  return guild.channels.fetch(botRoomId);
}

module.exports = fetchStreamChannel;
