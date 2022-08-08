const Pages = require("../util/pages")
const {
  pagesCollector
} = require("../util/collector")
const {
  MessageEmbed
} = require("discord.js")
const _ = require("lodash")

module.exports = {
  name: "list-servers",
  description: "get a list all servers",
  clientPermissions: ["SEND_MESSAGES",
    "EMBED_LINKS"],
  memberPermissions: [],
  cooldown: {
    time: 5000,
    message: ""
  },
  ownerOnly: true,
  run: async(client, interaction) => {
    try {
      const pages = new Pages()
      const guilds = _.chunk(client.guilds.cache.map(g => {
        return `**• ${g.name}**\n${client.emoji.arrow2} ${g.id}\n${client.emoji.arrow2} ${client.users.cache.get(g.ownerId)?.username}#${client.users.cache.get(g.ownerId)?.discriminator}\n${client.emoji.arrow} ${g.memberCount} members`
      }), 8)

      for (const guild of guilds) {
        pages.add(new MessageEmbed()
          .setTitle("Server List " + "Total: " + client.guilds.cache.size)
          .setDescription(guild.join("\n\n"))
          .setFooter({
            text: `\©${new Date().getFullYear()} Dream`, 
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
          .setColor("RANDOM")
        )
      }
      interaction.followUp({
        embeds: [pages.firstPage]}).then(async msg => {
        await pagesCollector(msg, interaction.user, 60000, pages)
      })
    } catch (e) {
      interaction.error("Something went  wrong ;)..\nError: " + e.message)
      console.log(e)
    }
  }
}