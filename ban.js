const Discord = require("discord.js")

module.exports = {
  name: "ban",
  description: "Allows you to ban a member.",
  permission: Discord.PermissionFlagsBits.BanMembers,
  ownerOnly: false,
  dm: false,
  category: ":tools:・Modération",
  usage: "/ban",
  options: [
    {
      type: "user",
      name: "membre",
      description: "The member to ban",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "raison",
      description: "The reason for the ban",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    let user = await bot.users.fetch(args._hoistedOptions[0].value);
    if (!user) return message.reply("No member to ban!");
    let member = message.guild.members.cache.get(user.id);

    let reason = args.get("raison").value;
    if (!reason) reason = "No reason provided.";

    if (message.user.id === user.id)
      return message.reply(
        ":🚫: Don't try to ban yourself !"
      );
    if ((await message.guild.fetchOwner()).id === user.id)
      return message.reply(
        ":🚫: Don't ban the Owner from the server !"
      );
    if (member && !member.bannable)
      return message.reply(
        ":🚫: I can't ban this member!"
      );
    if (
      member &&
      message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
    )
      return message.reply(
        ":🚫: You can't ban this member !"
      );
    if ((await message.guild.bans.fetch()).get(user.id))
      return message.reply(
        ":🚫: This member is already banned !"
      );

    try {
      await user.send(
        `🚫 You were banned from the server ${message.guild.name} by ${message.user.tag} for the reason : \`${reason}\``
      );
    } catch (err) {}

    await message.reply(
      `🚫 ${message.user} banned \`${user.tag}\` for the reason \`${reason}\``
    );

    await message.guild.bans.create(user.id, { reason: reason });
  },
};

