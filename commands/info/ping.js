const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ping",
  category: "info",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `ping`,
  run: async (client, message, args) => {
    const msg = await message.channel.send("🏓 Latencia");

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("🏓 Pong!")
      .setDescription(
        `Latencia del bot **${Math.floor(
          msg.createdTimestamp - message.createdTimestamp
        )} ms** \nLatencia de la API **${Math.round(client.ws.ping)} ms**`
      );

    message.channel.send(embed);
  },
};
