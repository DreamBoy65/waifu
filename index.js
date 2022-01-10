const Bot = require("./struct/client");

const client = new Bot();

const options = {
  bypass: true,
  log: true,
  paths: ["bot"]
};

client.loadCommands({ 
  parent: 'commands', 
  ...options 
});

client.loadEvents({ 
  parent: 'events', 
  ...options,
  dirs: ["client", "guild"]
});

client.loadSlash();

client.database?.init()

if(client.config.antiCrash) {
  client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
  ], { ignore: false });
}

client.login(client.config.client.token)