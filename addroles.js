const Discord = require("discord.js");
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "addroles",
  description: "Add a role to a member ",
  permission: Discord.PermissionFlagsBits.ManageRoles,
  ownerOnly: false,
  dm: false,
  category: "Modration",
  usage: "/addroles",
  options: [
    {
      type: "user",
      name: "membre",
      description: " who do you want to add a role ? ",
      required: true,
      autocomplete: false,
    },
    {
      type: "role",
      name: "role",
      description: "What role do you want to add ?",
      required: true,
      autocomplete: false,
    },
  ],
  async run(bot, interaction, args) {
    const member = interaction.options.getMember("membre");
    const role = interaction.options.getRole("role");

    member.roles
      .add(role)
      .then(async () => {
        await interaction.reply(
          `:lower_left_ballpoint_pen: the role ${role} has been successfully added to ${member}`
        );
      })
      .catch(async (error) => {
        console.log(error);
        await interaction.reply({
          ephemeral: true,
          content: `:lower_left_ballpoint_pen: I couldn't add the role ${role} to ${member} probably for lack of permission.`,
        });
      });
  },
};