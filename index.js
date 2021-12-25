const Bot = require("./struct/client")

const client = new Bot()

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

client.database?.init()

client.listentoProcessEvents([
  'unhandledRejection',
  'uncaughtException'
], { ignore: false });

client.login(process.env.TOKEN)