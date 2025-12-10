const Discord = require("discord.js");
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "unroles",
  description: "Remove a role from a member.",
  permission: Discord.PermissionFlagsBits.ManageRoles,
  ownerOnly: false,
  dm: false,
  category: "Modration",
  usage: "/unroles",
  options: [
    {
      type: "user",
      name: "membre",
      description: "who do you want to remove a role from ?",
      required: true,
      autocomplete: false,
    },
    {
      type: "role",
      name: "role",
      description: "Which role do you want to delete ?",
      required: true,
      autocomplete: false,
    },
  ],
  async run(bot, interaction, args) {
    const member = interaction.options.getMember("membre");
    const role = interaction.options.getRole("role");

    member.roles
      .remove(role)
      .then(async () => {
        await interaction.reply(
          `:lower_left_ballpoint_pen: the role ${role} has been correctly deleted at ${member}`
        );
      })
      .catch(async (error) => {
        console.log(error);
        await interaction.reply({
          ephemeral: true,
          content: `:lower_left_ballpoint_pen: I couldn't delete the role ${role} a ${member} probably a lack of permission.`,
        });
      });
  },
};