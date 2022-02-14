const WebSocketClient = require("websocket").client;

async function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
}
function sendMessage(connection, msg) {
  return connection.send(JSON.stringify(msg));
}

const streamServer = {
  status: "offline",
  lastTimeOnline: null,
};

function pollForStream(botClient, streamAddress) {
  const client = new WebSocketClient();

  client.on("connectFailed", async (error) => {
    console.error(`Connection Failed: ${error.toString()}`);
    await sleep(20);
    return pollForStream(botClient);
  });

  client.on("connect", (connection) => {
    connection.on("error", async (error) => {
      console.error(`Connection Error: ${error.toString()}`);
    });

    connection.on("close", async () => {
      if (streamServer.status === "online") {
        streamServer.status = "offline";
        const currentTime = Date.now();
        if (currentTime - streamServer.lastTimeOnline > 30000) {
          botClient.emit("streamEnd");
        }
        streamServer.lastTimeOnline = currentTime;
      }
      await sleep(5);
      return pollForStream(botClient);
    });

    connection.on("message", (message) => {
      const msg = JSON.parse(message.utf8Data);
      if (msg.sdp?.type === "offer") {
        if (streamServer.status === "offline") {
          streamServer.status = "online";
          const currentTime = Date.now();
          if (currentTime - streamServer.lastTimeOnline > 30000) {
            botClient.emit("streamStart");
          }
        }
      }
    });

    async function sendOffer() {
      if (connection.connected) {
        sendMessage(connection, {
          command: "request_offer",
        });
        await sleep(5);
        sendOffer();
      }
    }

    sendOffer();
  });
  client.connect(streamAddress);
}

module.exports = pollForStream;
