const Discord = require("discord.js");

module.exports = {
  name: "kick",
  description: "Permet de kick un membre.",
  permission: Discord.PermissionFlagsBits.KickMembers,
  ownerOnly: false,
  dm: false,
  category: ":tools:・Modération",
  usage: "/kick",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Le membre à kick",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "raison",
      description: "La raison du kick",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    let user = args.getUser("membre");
    if (!user) return message.reply("No member to kick!");
    let member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply("No member to kick!");

    let reason = args.getString("raison");
    if (!reason) reason = "No reason provided.";

    if (message.user.id === user.id)
      return message.reply(
        "<:hammer:1065045190303297657> Don't try to kick yourself !"
      );
    if ((await message.guild.fetchOwner()).id === user.id)
      return message.reply(
        "<:hammer:1065045190303297657> Do not kick the Owner from the server !"
      );
    if (member && !member.kickable)
      return message.reply(
        "<:hammer:1065045190303297657> I can't kick this member !"
      );
      if (
        member &&
        message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
      )
        return message.reply(
          "<:hammer:1065045190303297657> You can't kick this member !"
        );
    try {
      await user.send(
        `<:hammer:1065045190303297657> You were kicked from the server ${message.guild.name} by ${message.user.tag} for the reason : \`${reason}\``
      );
    } catch (err) {}

    await message.reply(
      `<:hammer:1065045190303297657> ${message.user} to kick ${user.tag} for the reason: \`${reason}\``
    );

    await member.kick(reason);
  },
};
