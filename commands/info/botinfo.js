const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "botinfo",
  aliases: ["info", "infobot"],
  category: "info",
  description: "Informacion del bot.",
  usage: `botinfo`,
  run: async (client, message, args) => {
    const actividad = moment
      .duration(client.uptime)
      .format(" D [dias], H [hrs], m [mins], s [secs]");

    const botinfo = new MessageEmbed()
      .setAuthor(`Informacion del bot`, client.user.avatarURL())
      .setThumbnail(client.user.avatarURL({ size: 2048 }))
      .setDescription("**TeamDevv: ** `Developer:「六┇RimuruSenpai」#8720`")
      .addField(
        "Servidores: ",
        "```diff\n- " + client.guilds.cache.size + "\n```",
        true
      )
      .addField("Uptime: ", "```\n" + actividad + "\n```", true)
      .addField(
        "RAM: ",
        "```fix\n" +
          (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) +
          "MB\n```",
        true
      )
      .addField("Lenguaje: ", '```json\n"JavaScript"\n```', true)
      .addField("Libreria: ", "```ini\n[Discord.js v12.2.0]\n```", true)
      .setFooter(`Informacion solicitada por ${message.author.username}`)
      .setColor("RANDOM");

    message.channel.send(botinfo);
  },
};
