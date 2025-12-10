const Discord = require("discord.js");

module.exports = {
  name: "unban",
  description: "Allows to unban a member.",
  permission: Discord.PermissionFlagsBits.BanMembers,
  ownerOnly: false,
  dm: false,
  category: "🛠️・Modération",
  usage: "/unban",
  options: [
    {
      type: "user",
      name: "users",
      description: "The user' to unban",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "raison",
      description: "The reason for the unban",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    try {
      let user = args.getUser("users");
      if (!user) return message.reply("No user");

      let reason = args.getString("raison");
      if (!reason) reason = "No reason given.";

      if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply(":white_check_mark: This user is not banned!");

      try {
        await user.send(
          `:white_check_mark: You were a ban of **${message.guild.name}** by **${message.user.tag}** for the reason : \`${reason}\``
        );
      } catch (err) {}

      await message.reply(
        `:white_check_mark: ${message.user} to unban ${user.tag} for the reason : \`${reason}\``
      );

      await message.guild.members.unban(user, reason);
    } catch (err) {
      return message.reply("No user");
    }
  },
};
