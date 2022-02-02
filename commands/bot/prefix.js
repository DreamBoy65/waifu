module.exports = {
  name: "prefix",
  aliases: [],
  group: "bot",
  description: "set the server prefix.",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: ["MANAGE_GUILD"],
  examples: ["prefix $"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
        let prefix = args[0]

        if(!prefix || prefix.length > 5) return message.error("Prefix must be defined and lower than 5 in length")

        data.prefix = prefix
        await data.save()

        message.success("Setup complete!")
    } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}