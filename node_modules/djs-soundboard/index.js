const { getSound } = require("./sounds")
const fs = require("fs")
const { createAudioResource, getVoiceConnection, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice")
const path = require("path")

class SoundBoard {
  constructor(options) {
    
  }
  
  async play(channel, sound) {
    
    let Sound = getSound(sound)
    
    if(!Sound) throw new TypeError("[soundboard]: InValid Sound.")
    
    let connection = getVoiceConnection(channel.guild.id)
    
    if(!connection) {
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })
    }
    
    let player = createAudioPlayer()
    let res = createAudioResource(path.join(__dirname, `./src/${Sound.file}`), {
      metadata: {
        title: Sound.name
      }
    })
    
    player.play(res)
    connection.subscribe(player)
    
    player.on(AudioPlayerStatus.Idle, () => {
      connection.destroy()
    })
  }
  
  getAllSounds() {
    let array = []
    
    fs.readdirSync("./src").forEach(dir => {
      
      let files = fs.readdirSync(`./src/${dir}/`).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"))
      
      array.push({
        category: dir,
        sounds: []
      })
      
      let Arr = array.find(c => c.category === dir)
      
      files.forEach(file => {
        Arr.sounds.push(file.split(".")[0])
      })
    })
    
    return array;
  }
}

module.exports = SoundBoard