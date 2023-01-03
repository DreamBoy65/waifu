module.exports = {
  name: 'tts',
  description: 'tts your words',
  nsfw: false,
  cooldown: {
    time: 1000,
  },
  options: [
    {
      "String": {
      name: "message",
      description: "Message to tts.",
      required: true
      }
    }
  ],
  run: async (client, interaction) => {
    
    if(!interaction.member.voice.channel) return interaction.error("You have to be in vc to use this command!")

    let msg = interaction.options.getString("message")

     await client.sound.tts(interaction.member.voice.channel, `${msg.toLowerCase()}...... ♤bye`)

    interaction.followUp({content: "\\😙", ephemeral: true})
  }
}