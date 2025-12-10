const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "unmute",
  description: "Allows to unmute a member.",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  ownerOnly: false,
  dm: false,
  category: "🛠️・Modération",
  usage: "/unmute",
  options: [
    {
      type: "user",
      name: "membre",
      description: "The member to unmute",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "raison",
      description: "The reason for unmuting",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    let user = args.getUser("membre");
    if (!user)
      return message.reply(":stopwatch: No member !");
    let member = message.guild.members.cache.get(user.id);
    if (!member)
      return message.reply(":stopwatch: No member !");

    let reason = args.getString("raison");
    if (!reason) reason = "No reason given.";

    if (!member.moderatable)
      return message.reply(
        ":stopwatch: I can't unmute this member !"
      );
    if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
    )
      return message.reply(
        ":stopwatch: you cannot unmute this member !"
      );
    if (!member.isCommunicationDisabled())
      return message.reply(
        ":stopwatch: This member is not muted !"
      );

    try {
      await user.send(
        `:stopwatch: You have been unmuted by ${message.user.tag} for the reason : \`${reason}\``
      );
    } catch (err) {}

    await message.reply(
      `:stopwatch: ${message.user} to unmute ${user.tag} for the reason : \`${reason}\``
    );

    await member.timeout(null, reason);
  },
};
