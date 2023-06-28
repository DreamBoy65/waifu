module.exports = {
  name: "play",
  description: "play bruh",
  cooldown: {
    enable: true,
    time: 5000,
  },
  run: async (client, int) => {
    await client.sound.play( int.member.voice.channel, "bruh");
  },
};
