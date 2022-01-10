const perms = require("../permission")
const cooldowns = require("../cooldowns")
const ms = require("ms")

async function handleSlash(client, interaction) {
  const CategoryName = interaction.commandName;
	let command = false;
	try{
    	    if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
      		command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
    	    }
  	}catch{
    	    if (client.slashCommands.has("normal" + CategoryName)) {
      		command = client.slashCommands.get("normal" + CategoryName);
   	    }
	}
	
	if(!command) return;
	
	await interaction.deferReply({ephemeral: false}).catch(() => {});
	
	const { accept: permission_granted, terminate, embed } = perms.check(interaction, command);

  if (terminate){
    return { executed: false, reason: 'TERMINATED' };
  };

  if (!permission_granted){
    if (interaction.guild){
      interaction.followUp(
        interaction.channel.permissionsFor(interaction.guild.me).has('EMBED_LINKS')
        ? {embeds: [embed]} : embed.description
      );
    } else {
      interaction.followUp({embeds: [embed]});
    };
    return { executed: false, reason: 'PERMISSION' };
  
  };
  
  const { accept: cooldown_accepted, timeLeft } = cooldowns.check(interaction, command, true);

  if (!cooldown_accepted){
     interaction.sendE([
      `\\🚫\u2000\u2000|\u2000\u2000${interaction.user}`,
      `${command.cooldown.message || "Slowdown on the name of GOD!"}\n\\⏳\u2000\u2000|\u2000\u2000Time left:`,
      ms(timeLeft)
    ].join(' '))

    return { executed: false, reason: 'COOLDOWN' };
  } else {
    try {
      await command.run(client, interaction)
    } catch (e) {
      interaction.followUp(`Something went wrong;)`)
      console.log(String(e.stack).grey)
    }
  }
}

module.exports = { handleSlash }