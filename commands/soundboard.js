const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  name: "sounds",
  description: "give a board!",
  cooldown: {
    time: 5000,
    enable: true,
  },
  memberpermissions: [],
  clientPermissions: [],
  nsfw: false,
  ephemeral: false,
  run: async (client, interaction) => {
    let menu = new StringSelectMenuBuilder()
      .setPlaceholder("Select sounds °•°.")
      .setCustomId("soundb");

    let sounds = client.sound.getAllSounds();

    sounds.map((s) => {
      menu.addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel(s.category.toUpperCase())
          .setDescription("Sounds categories.")
          .setValue(s.category)
      );
    });

    let row = new ActionRowBuilder().addComponents(menu);

    interaction.followUp({ content: "** **", components: [row] });
  },
};
