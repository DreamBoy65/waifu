const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');
const didYouMean = require("didyoumean")
const { readdirSync } = require("fs")
const Images = require("discord-images")
const images = new Images.Client()
const _ = require("lodash")

module.exports = {
  name: "help",
  aliases: ["h", "commands"],
  group: "bot",
  description: "Help Command!",
  clientPermissions: ["SEND_MESSAGES", 
"EMBED_LINKS"],
  memberPermissions: [],
  examples: ["help"],
  cooldown: {
    time: 5000
  },
  nsfw: false,
  guildOnly: false,
  run: (client, message, args) => {
   try{
       
     if(args[0]){
     let commands = []    

client.commands.registers.map(c => commands.push(c.name))

     const command = args[0]
     let cmd = client.commands.get(command)

     let dum = didYouMean(command, commands)

     if(!cmd) return message.error(dum ? "That command does not exist OwO\nDid You Mean **"+dum+"** ?" : "That command does not exist OwO")

     const embed = new MessageEmbed()
     .setTitle("Help Command ? • " + command)
     .setDescription("Command information.")
     .addField(`**__Name__**`, `>>> • ${cmd.name}`)
     .addField(`**__Description__**`, cmd.description ? ">>> • " + cmd.description : ">>> Not Provided.")
     .addField("**__Aliases__**", cmd.aliases.length ? ">>> • " + cmd.aliases.join(" , ") : ">>> • Not Provided")
     .addField("**__Group__**", cmd.group ? ">>> • " + cmd.group : ">>> • Not Provided.")
     .addField("**__Examples__**", cmd.examples.length ? ">>> • " + cmd.examples.join("\n") : ">>> • Not Provided.")
     .addField("**__Parameters__**", cmd.parameters.length ? cmd.parameters.join("\n") : ">>> • Not Provided.")
     .addField("**__Guild Only__**", cmd.guildOnly ? ">>> • True." : ">>> • False.")
     .addField("**__Admin Only__**", cmd.adminOnly ? ">>> • True." : ">>> • False.")
      .addField("**__Owner Only__**", cmd.ownerOnly ? ">>> • True." : ">>> • False.")
       
      .addField("**__Nsfw__**", cmd.nsfw ? ">>> • True." : ">>> • False.")
      .addField("**__CoolDown Time__**", ">>> • " + cmd.cooldown.time)
      .addField("**__Bot Permissions__**", cmd.clientPermissions.length ? ">>> • " + cmd.clientPermissions.join(" , ") : ">>> • Not Provided.")
       .addField("**__Member Permissions__**", cmd.permissions.length ? ">>> • " + cmd.permissions.join(" , ") : ">>> • Not Provided.")
       .setTimestamp()   
       .setColor("RANDOM")
  
.setImage("https://media.discordapp.net/attachments/885113922489815052/885540471533862962/20210909_203127.jpg")
     
       message.channel.send({embeds:[embed]})
       
   } else {

         let embed = new MessageEmbed()
         .setTitle(`Global.io help panel-`)
         .setThumbnail(images.dance())
         .setFooter(`©Global`)
         .setTimestamp()
         .setColor("RANDOM")
         
         categories = [...new Set(client.commands.registers.map((cmd) => cmd.group))];

         let dirs = []

         for(const dir of categories) {
             dirs.push(dir)
         }

         let emo;

         dirs.map(d => {
             if(d === "bot") {
                 emo = "🤖"
             }
             if(d === "setup") {
                 emo = "⚙"
             }
             embed.addField(`**__\\${emo} | ${d} | ${client.commands.registers.map(c => c).filter(c => c.group === d).length}__**`, ">>> " + client.commands.registers.map(c => c).filter(c => c.group === d).map(c => `\`${c.name}\`\n${client.commands.get(c.name).description}`).join("\n\n"))
         })


         embed.addField(`**__\\😄 | Support__**`, `[Support Server](${client.config.support})`)
         message.reply({embeds: [embed]})
        }
       
   } catch (e){
     message.error("Something went wrong ;)....")
     console.log(e)
    }
  } 
} 