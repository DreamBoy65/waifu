const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = async (client, int) => {
  if (int.customId === "soundb") {
    let category = int.values[0];
    let sounds = client.sound.getAllSounds();

    sounds = sounds.find((c) => c.category === category);
    await int.deferReply({ ephemeral: false }).catch(() => {});

    if (!sounds)
      return int.followUp({
        content: "Something went wrong!",
        ephemeral: true,
      });

    let menus = [];
    let rows = [];
    let opts = [];

    for (let i = 0; i < Math.ceil(sounds.sounds.length / 20); i++) {
      let menu = new StringSelectMenuBuilder()
        .setCustomId(`play-${i}`)
        .setPlaceholder("Select Sounds ^_^");

      menus.push(menu);
    }

    for (const sound of sounds.sounds) {
      opts.push(
        new StringSelectMenuOptionBuilder()
          .setLabel(sound)
          .setDescription("Click Me dude")
          .setValue(sound)
      );
    }

    menus.forEach((m, i) => {
      m.addOptions(opts.slice(0 + i * 20, 20 + i * 20));
    });

    for (const menu of menus) {
      rows.push(new ActionRowBuilder().addComponents(menu));
    }

    int.followUp({
      content: "Here, Look at these cool sounds.",
      components: rows,
    });
  }

  if (int.customId?.split("-")[0] === "play") {
    let vc = int.member.voice.channel;

    if (!vc) int.reply({ content: "Join vc first!", ephemeral: true });

    /*if(!vc.permissionFor(interaction.guild.me).has("SPEAK" || "CONNECT")) {
      interaction.reply({content: "I Dont have permission to join or speak in your vc!", ephemeral: true})
    }*/

    let array = client.sound.getAllSounds();

    if (
      array
        .find((c) => c.category === "nsfw")
        .sounds.find((c) => c === int.values[0]) &&
      !int.channel.nsfw
    )
      return int.reply({
        content: "You Can only play nsfw sounds in nsfw text-channel!",
        ephemeral: true,
      });

    await client.sound.play(vc, int.values[0]);

    int.reply({ content: "?●•°¿", ephemeral: true });
  }
};
