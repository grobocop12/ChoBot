const { roleMention, hideLinkEmbed } = require("@discordjs/builders");
const fetchStreamChannel = require("./utils/stream");

module.exports = {
  name: "streamStart",
  once: false,
  async execute(client) {
    const channel = await fetchStreamChannel(client);
    const role = roleMention("912770535287578625");
    const link = hideLinkEmbed("http://sigmasuite.ddns.net/watch");
    channel.send({ content: `Hej ${role}, strumyczek na ${link}` });
  },
};
