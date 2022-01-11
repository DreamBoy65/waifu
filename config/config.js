module.exports = {
    
    client: {
      presence: {
        activity: {
          name: "Demons 🎭",
          type: "WATCHING"
        }, 
      status: "dnd"
      },
      token: ""
    },
    prefix: ".",
    support: "https://discord.gg/pwAXkpsCHf",
    loadSlashsGlobal: false,
    slashCommandsDirs: [
      {
        Folder: "",
        CmdName: "",
        CmdDescription: ""
      }
    ],
    antiCrash: true,
    timezone: "Asia/Calcutta",
    
    channels: {
        debug: "924076193253326869",
        guildJoin: "924076079839346709",
        guildLeave: "924076132846948412",
        feedback: "924076275893674025",
        commands: "924076446689939556"
    },

    database: {
        enable: false,
        uri: process.env.MONGO_URI,
        config: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }
    },
}