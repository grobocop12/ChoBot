const streamEnd = require("./streamEnd");
const streamStart = require("./streamStart");

const events = [streamStart, streamEnd];

function registerEvents(client) {
  events.forEach((event) => {
    client.on(event.name, (...args) => event.execute(client, ...args));
  });
}

module.exports = registerEvents;
