const { spoiler } = require("@discordjs/builders");
const fetchStreamChannel = require("./utils/stream");

module.exports = {
  name: "streamEnd",
  once: false,
  async execute(client) {
    const channel = await fetchStreamChannel(client);
    channel.send(spoiler("koniec strumyczka :("));
  },
};
