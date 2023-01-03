module.exports = {
    
    client: {
      presence: {
        activity: {
          name: "Demons 🎭",
          type: "WATCHING"
        }, 
      status: "dnd"
      },
      token: process.env.Token
    },
    
    owners: ["813299347819069520"],
    
    prefix: ".",
    support: "https://discord.gg/pwAXkpsCHf",
    invite: "https://discord.com/api/oauth2/authorize?client_id=827614583773462528&permissions=2150647808&scope=bot%20applications.commands",

    loadSlashsGlobal: true,
    slashCommandsDirs: [
      {
        Folder: "",
        CmdName: "",
        CmdDescription: ""
      }
    ],
    SlashCommands: true,
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