module.exports = {
  bot: {
    token:
      "MTExMzc1NjA4NjgzOTgwODA3MA.GY3w4o.3ZS_SI-97ZEj_Dp3YIRl27jjOioznVxXfsGKxk",
    intents: ["Guilds", "GuildVoiceStates"],
  },

  events: {
    dir: "events",
    subDirs: ["client", "guild"],
    dirs: true,
    showLogs: false,
  },

  slashCommand: {
    enable: true,
    dir: "commands",
    showLogs: true,
    loadGlobal: false,
  },

  textCommand: {
    enable: false,
  },

  mongoDB: {
    enable: false,
    uri: "mongodb://chatos:chatos@ac-i8itq5j-shard-00-00.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-01.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-02.8nr3yvt.mongodb.net:27017/test?replicaSet=atlas-nnc0jd-shard-0&ssl=true&authSource=admin",
    models: [],
  },
};
