const { MessageEmbed, Message, Client, Interaction } = require("discord.js")
const emoji = require("../config/emoji")

  Message.prototype.sendE = function(string, options = {}){
    const embed = new MessageEmbed()
    .setAuthor({ name: this.author.username, iconURL: this.author.displayAvatarURL() })
    .setDescription(string)
    .setColor("RANDOM")
       .setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()
    
    if(options.title){
      embed.setTitle(options.title)
    }
    if(options.image){
      embed.setImage(options.image)
    }
    if(options.edit){
      this.edit({embeds: [embed]})
    }else{
      this.reply({embeds: [embed], components: options.row ? [options.row] : []})
    }
  }



Message.prototype.error = function(string){
this.reply({embeds: [new MessageEmbed(). setAuthor({ name: this.author.username, iconURL: this.author.displayAvatarURL() } ).setDescription(`${emoji.no}` + " | " + string).setColor("RED").setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()]})
}

Message.prototype.success = function(string){
  this.reply({embeds: [
    new MessageEmbed()
  .setAuthor({ name: this.author.username, iconURL: this.author.displayAvatarURL() })
  .setDescription(`${emoji.yes} | ${string}`)
    .setColor("GREEN")
    .setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()
  ]})
}

Message.prototype.load = async function(string, options = {}){
  
  this.reply({embeds: [
    new MessageEmbed()
  .setAuthor({ name: this.author.username, iconURL: this.author.displayAvatarURL() })
  .setDescription(`${emoji.load} | ${string}`)
    .setColor("GREEN")
  ]}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, options.timeOut ? options.timeOut : 5000)
  })
}

//Interaction
Interaction.prototype.sendE = function(string, options = {}){
    const embed = new MessageEmbed()
    .setAuthor({ name: this.user.username, iconURL: this.user.displayAvatarURL() })
    .setDescription(string)
    .setColor("RANDOM")
       .setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()
    
    if(options.title){
      embed.setTitle(options.title)
    }
    if(options.image){
      embed.setImage(options.image)
    }
    if(options.edit){
      this.edit({embeds: [embed]})
    }else{
      this.followUp({embeds: [embed], components: options.row ? [options.row] : []})
    }
  }



Interaction.prototype.error = function(string){
this.followUp({embeds: [new MessageEmbed(). setAuthor({ name: this.user.username, iconURL: this.user.displayAvatarURL() } ).setDescription(`${emoji.no}` + " | " + string).setColor("RED").setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()]})
}

Interaction.prototype.success = function(string){
  this.followUp({embeds: [
    new MessageEmbed()
  .setAuthor({ name: this.user.username, iconURL: this.user.displayAvatarURL() })
  .setDescription(`${emoji.yes} | ${string}`)
    .setColor("GREEN")
    .setFooter({ text: `\©${new Date().getFullYear()} ${this.client.user.username}` })
    .setTimestamp()
  ]})
}

Interaction.prototype.load = async function(string, options = {}){
  
  this.followUp({embeds: [
    new MessageEmbed()
  .setAuthor({ name: this.user.username, iconURL: this.user.displayAvatarURL() })
  .setDescription(`${emoji.load} | ${string}`)
    .setColor("GREEN")
  ]}).then(msg => {
      setTimeout(() => {
        msg.delete()
      }, options.timeOut ? options.timeOut : 5000)
  })
}