const { handleSlash } = require("../../util/handlers/scmdHandler2")
const { MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = async(client, interaction) => {

  console.log("lol")

  if(interaction.type === "APPLICATION_COMMAND") {
    await handleSlash(client, interaction)
  }

  if(interaction.customId === "soundb") {
    let category = interaction.values[0]
    let sounds = client.sound.getAllSounds()
    sounds = sounds.find(c => c.category === category)
    await interaction.deferReply({ephemeral: false}).catch(() => {});

    if(!sounds) return interaction.followUp({content: "Something went wrong!", ephemeral: true})

    let menus = []
    let rows = []
    let opts = []
        
    for (let i = 0; i < Math.ceil(sounds.sounds.length / 20); i++) {
      let menu = new MessageSelectMenu()
      .setCustomId(`play-${i}`)
      .setPlaceholder("Select Sounds ^_^")

      menus.push(menu)
    }
    
    for (const sound of sounds.sounds) {
      opts.push({
        label: sound,
        description: "Click Me ^^",
        value: sound
      })
    }
    
    menus.forEach((m, i) => {
      m.options = opts.slice(0 + (i * 20), 20 + (i * 20))    
    })
      
    for(const menu of menus) {
      rows.push(new MessageActionRow().addComponents(menu))
    }     
    
    interaction.followUp({content: "Here you go!", components: rows, ephemeral: true})
  }

  if(interaction.customId?.split("-")[0] === "play") {
    let vc = interaction.member.voice.channel
    
    if(!vc) interaction.reply({content: "Join vc first!", ephemeral: true})

   /*if(!vc.permissionFor(interaction.guild.me).has("SPEAK" || "CONNECT")) {
      interaction.reply({content: "I Dont have permission to join or speak in your vc!", ephemeral: true})
    }*/

    let array = client.sound.getAllSounds()

    if(array.find(c => c.category === "nsfw").sounds.find(c => c === interaction.values[0]) && !interaction.channel.nsfw) return interaction.reply({content: "You Can only play nsfw sounds in nsfw text-channel!", ephemeral: true })

    await client.sound.play(vc, interaction.values[0])
    
    interaction.reply({content: "\\🔊", ephemeral: true})
  }
}