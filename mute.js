const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Allows you to mute a member.",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  ownerOnly: false,
  dm: false,
  category: "🛠️・Modération",
  usage: "/mute",
  options: [
    {
      type: "user",
      name: "membre",
      description: "The mute member",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "temps",
      description: "The mute time (minutes, hours, seconds...)",
      required: true,
      autocomplete: false,
      choices: [
        {
          name: "day",
          value: "d",
        },
        {
          name: "hour",
          value: "h",
        },
        {
          name: "minute",
          value: "m",
        },
        {
          name: "second",
          value: "s",
        },
      ],
    },
    {
      type: "string",
      name: "raison",
      description: "The reason for the mute",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    let user = args.getUser("membre");
    if (!user) return message.reply("No member !");
    let member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply("No member !");

    let time = args.getString("temps");
    if (!time)
      return message.reply(":stopwatch: No time !");
    if (isNaN(ms(time)))
      return message.reply(":stopwatch: Not the right size!");
    if (ms(time) > 2419200000)
      return message.reply(
        ":stopwatch: The mute cannot last longer than 28 days !"
      );

    let reason = args.getString("raison");
    if (!reason) reason = "No reason given.";

    if (message.user.id === user.id)
      return message.reply(
        ":stopwatch: Don't mutate yourself !"
      );
    if ((await message.guild.fetchOwner()).id === user.id)
      return message.reply(
        ":stopwatch: Do not mute the server's Owner !"
      );
    if (!member.moderatable)
      return message.reply(
        ":stopwatch: I can't mute this member !"
      );
    if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
    )
      return message.reply(
        ":stopwatch: You cannot mute this member !"
      );
    if (member.isCommunicationDisabled())
      return message.reply(
        ":stopwatch: This member is already muted !"
      );

    try {
      await user.send(
        `:stopwatch: You were muted from the server ${message.guild.name} by ${message.user.tag} during ${time} for the reason : \`${reason}\``
      );
    } catch (err) {}

    await message.reply(
      `:stopwatch: ${message.user} to mute ${user.tag} during ${time} for the reason: \`${reason}\``
    );

    await member.timeout(ms(time), reason);
  },
};