const discordClient = require("./discordBot/bot");
const { token } = require("../config/discord");
const pollForStream = require("./sigmaVideoWatcher/poller");

function main() {
  discordClient.login(token);
  pollForStream(discordClient);
}

main();
