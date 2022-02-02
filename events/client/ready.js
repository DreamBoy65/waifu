module.exports = (client) => {
    console.log("Logged in as " + client.user.username)

    client.user.setPresence({ activities: [{ name: 'Demons... .' , type: "WATCHING"}], status: 'idle' });
}