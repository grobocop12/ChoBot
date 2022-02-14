const discordClient = require("./discordBot/bot");
const { token, streamAddress } = require("../config/discord");
const pollForStream = require("./sigmaVideoWatcher/poller");

function main() {
  discordClient.login(token);
  if (streamAddress) {
    pollForStream(discordClient, streamAddress);
  }
}

main();
