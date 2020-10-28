const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "hackban",
  category: "moderacion",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `hackban`,
  run: async (client, message, args) => {
    if (!args[1]) return message.channel.send('Put a ~~snowflake~~ user ID to hackban them.');
    try {
      await message.guild.members.ban(args[1]);
      message.channel.send(`I've hackbanned that user.`);
    } catch (err) {
      if (err.code === 50035) return message.channel.send("Invalid ID!");
      message.channel.send(`I couldn't hackban that user. Here's a debug: ${err}`);
    }
  },
};
