let Schema = require("../../models/GuildProfile");

module.exports = async (client, message) => {
  
  if (message.author.bot){
    return;
  }
  
  const { executed, reason } = await client.commands.handle(message);

return;
};