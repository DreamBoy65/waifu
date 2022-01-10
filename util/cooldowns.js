const CooldownManager = require(`${process.cwd()}/struct/commands/Cooldown`);

function check(message, command, slash){

  if (!command.cooldown.time){
    return { accept: true };
  } else {
    // Do nothing..
  };

  const cooldownManager = message.client.commands.cooldowns;
  let cooldown = cooldownManager.get(command.name);

  if (!cooldown){
    cooldownManager.set(command.name, new CooldownManager(command));
  } else {
    // Do nothing..
  };

  if (cooldown.users.has(slash ? message.user.id : message.author.id)){
    return {
      accept: false,
      timeLeft: cooldown.users.get(slash ? message.user.id : message.author.id).timestamp - Date.now()
    };
  } else {
    // Do nothing..
  };

  cooldown.users.set(slash ? message.user.id: message.author.id ,{ timestamp: Date.now() + command.cooldown.time });

  setTimeout(() => cooldown.users.delete(slash ? message.user.id : message.author.id), command.cooldown.time);

  return { accept: true };
};

module.exports = { check };