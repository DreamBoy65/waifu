module.exports = {
  name: "bot",
  description: "info about bot and links",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      interaction.sendE(`Waifu is a SoundBoard bot!\nWith over 60 sounds.\n\nInvite: [Invite](${client.config.invite})\n[Server](${client.config.support})`)
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgred)
    }
  }
}