module.exports = {
  name: "ping",
  description: "Gives you information on how fast the Bot is",
  cooldown: {
    time: 5000000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      interaction.sendE("Pong!")
    } catch (e) {
      interaction.error("Something went wrong;)")
      console.log(e)
    }
  }
}
