const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js")
const SoundBoard = require("djs-soundboard")
module.exports = async (client, interaction) => {

    if(interaction.customId === "sounds") {
        let category = interaction.values[0]

        let array = client.sound.getAllSounds()

        let sounds = array.find(c => c.category === category)

        if(!sounds) return interaction.reply({content: "Something went wrong ;()", ephemeral: true})

        let menu = new MessageSelectMenu()
        .setPlaceholder("Select sounds -_-")
        .setCustomId("play")

        sounds.sounds.map(c => {
            menu.addOptions({
                label: c,
                description: "click me ^^",
                value: c
            })        })


        const row = new MessageActionRow().addComponents(menu)

        interaction.reply({content: "Here you go!", components: [row], ephemeral: true})    
    }

    if(interaction.customId === "play") {
        let channel = interaction.member.voice.channel;
        
        if(!channel) return interaction.reply({content: "Join vc first", ephemeral: true})

        if(!channel.permissionsFor(interaction. guild.me).has("SPEAK" || "CONNECT")) return interaction.reply({content: `I don't have permissions to connect or speak in your channel!`, ephemeral: true})

        let s = new SoundBoard()

        let array = s.getAllSounds()

        if(array.find(c => c.category === "nsfw").sounds.find(c => c === interaction.values[0]) && !interaction.channel.nsfw) return interaction.reply({content: "You Can only play nsfw sounds in nsfw text-channel!", ephemeral: true })
        
        await s.play(channel, interaction.values[0])

        interaction.reply({content: `\\🔊`, ephemeral: true})
    }
}