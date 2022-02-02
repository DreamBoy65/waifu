module.exports = {
  name: "tts",
  aliases: [],
  group: "bot",
  description: "Tts Fun---",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["tts hlooooo"],
  cooldown: {
    time: 5000,
    message: ""
  },
  nsfw: false,
  guildOnly: true,
  run: async(client, message, args, data) => {
    try {
        if(!message.member.voice.channel) return message.error("You have to be in vc to use this cmd.")

        let text = args.join(" ")

        if(!text) {
            text = "give something to say"
        }

        await client.sound.tts(message.member.voice.channel, `${text.toLowerCase()}...... ♤bye`, data.sb.lang, data.sb.slow)

            message.react("🔊")
            
           } catch (e) {
      message.error("Something went  wrong ;)..\nError: " + e.message + "\nContact my developers to fix it")
      console.log(e)
    }
  }
}