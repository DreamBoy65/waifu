module.exports = (client) => {
    console.clear()
    console.log("Logged  in!")
    
    client.user.setPresence({ activities: [{ name: client.config.client.presence.activity.name, type: client.config.client.presence.activity.type }], status: client.config.client.presence.status });
}