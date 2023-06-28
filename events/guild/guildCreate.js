

module.exports = async (client, guild) => {
  /*===============WELCOME TO THE GUILD_CREATE EVENT=============
    This function runs everytime the bot receives any guild payload
    from discord after the ready event is fired.
  =============================================================*/

  /*=====================================================
     Declare variables
  ==============================//====================================================
*/
  guild.members.fetch();

  const owner = await client.users
    .fetch(guild.ownerId)
    .then((owner) => owner.tag)
    .catch(() => "<Unfetched Data>");

  const logo = "<:Enter:794918219835637760>";
  const members = text.commatize(guild.memberCount);
  const message = `${logo} : **${members}** members, owned by **${owner}**`;

  /*======================================================
     Check the validity of database connection and save
     new guild profile.
  ======================================================*/
  //====================================================//

  /*======================================================
     Sends a notification to a log channel (if available)
     that the bot has joined a server
  ======================================================*/
  await client.channels.cache
    .get(client.config.channels?.guildJoin)
    ?.createWebhook(guild.name, {
      avatar: guild.iconURL({ format: "png", dynamic: true, size: 128 }),
    })
    .then((webhook) => Promise.all([webhook.send(message), webhook]))
    .then(([_, webhook]) => webhook.delete())
    .catch(() => {});
  //=====================================================//

  // add more functions on message guildCreate callback function...

  return;
};
