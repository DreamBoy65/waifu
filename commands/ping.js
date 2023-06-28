module.exports = {

  name: "ping",

  description: "ping bot",
  cooldown: {
    enable: true,
    time: 5000,
  },
  run: async (client, interaction) => {
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong! Client: \`${ping}ms\` | Websocket: \`${client.ws.ping}ms\``
    );
  },
};
