const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Delete many messages.",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  ownerOnly: false,
  dm: false,
  category: "🛠️・Modération",
  usage: "/clear",
  options: [
    {
      type: "number",
      name: "number",
      description: "The number of messages to delete",
      required: true,
      autocomplete: false,
    },
    {
      type: "channel",
      name: "channel",
      description: "The channel where to delete the messages",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, message, args) {
    let channel = args.getChannel("salon");
    if (!channel) channel = message.channel;
    if (
      channel.id !== message.channel.id &&
      !message.guild.channels.cache.get(channel.id)
    )
      return message.reply("No channels!");

    let number = args.getNumber("nombre");
    if (parseInt(number) <= 0 || parseInt(number) > 100)
      return message.reply(
        "<:protect:1065045344200708176> We need a number between `0` and `100` inclusive!"
      );

    try {
      let messages = await channel.bulkDelete(parseInt(number));

      await message.reply({
        content: `<:protect:1065045344200708176> I have deleted \`${messages.size}\` message(s) in the channel ${channel} !`,
        ephemeral: true,
      });
    } catch (err) {
      let messages = [...(await channel.messages.fetch()).values()].filter(
        async (m) => Date.now() - m.createdAt <= 1209600000
      );
      if (!messages.length <= 0)
        return message.reply(
          "<:protect:1065045344200708176> No messages to delete because they are all over 14 days old !"
        );
      await channel.bulkDelete(messages);

      await message.reply({
        content: `<:protect:1065045344200708176> I could only delete \`${messages.size}\` message(s) dans le salon ${channel} because the others were more than 14 days old  !`,
        ephemeral: true,
      });
    }
  },
};