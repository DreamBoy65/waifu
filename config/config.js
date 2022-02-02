module.exports = {
    
    client: {
      presence: {
        activity: {
          name: "Demons 🎭 | $",
          type: "WATCHING"
        }, 
      status: "dnd"
      },
    },
    prefix: ".",
    support: "https://discord.gg/pwAXkpsCHf",
    
    channels: {
        debug: "924076193253326869",
        guildJoin: "924076079839346709",
        guildLeave: "924076132846948412",
        feedback: "924076275893674025",
        commands: "924076446689939556"
    },

    debug: true,

    database: {
        enable: true,
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