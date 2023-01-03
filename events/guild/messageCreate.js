let Schema = require("../../models/GuildProfile");

module.exports = async (client, message) => {
  return;
  if (message.author.bot){
    return;
  }
  
  const { executed, reason } = await client.commands.handle(message);

return;
};