const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: "soundboard",
  description: "give a board!",
  cooldown: {
    time: 5000,
    message: ""
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  run: async(client, interaction) => {
    try {
      let menu = new MessageSelectMenu()
      .setPlaceholder("Select sounds UwU.")
      .setCustomId("soundb")
      
      let sounds = client.sound.getAllSounds()

      sounds.map(s => {
        menu.addOptions({
          label: s.category.toUpperCase(),
          description: "Sounds categories.",
          value: s.category
        })
      })

      let row = new MessageActionRow().addComponents(menu)

      interaction.followUp({content: "** **", components: [row]})
      
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(String(e).bgRed)
    }
  }
}