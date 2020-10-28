const { MessageEmbed } = require("discord.js");
const fetch = require("node-superfetch");
module.exports = {
  name: "ytstats",
  aliases: ["ytsts", "youtubestats", "estadisticasYT"],
  category: "busqueda",
  description: "Obten estadisticas de un canal de YouTube.",
  usage: `ytstats <canalYouTube>`,
  run: async (client, message, args) => {
    let nombre = args.join(" ");
    if (!nombre) return message.channel.send("Debe proporcionar un nombre");

    const canal = await fetch.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${nombre}&key=${process.env.GOOGLE}&maxResults=1&type=channel`
    );

    if (!canal.body.items[0])
      return message.channel.send("No hay resultados! Intentao devuelta");

    const datos = await fetch.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${canal.body.items[0].id.channelId}&key=${process.env.GOOGLE}`
    );

    const embedSeach = new MessageEmbed()
      .setColor(0x7289da)
      .setThumbnail(canal.body.items[0].snippet.thumbnails.high.url)
      .addField(
        "Nombre del canal",
        canal.body.items[0].snippet.channelTitle,
        true
      )
      .addField(
        "Descripcion del canal",
        canal.body.items[0].snippet.description,
        true
      )
      .addField(
        "Suscriptores:",
        parseInt(
          datos.body.items[0].statistics.subscriberCount
        ).toLocaleString(),
        true
      )
      .addField(
        "Visitas:",
        parseInt(datos.body.items[0].statistics.viewCount).toLocaleString(),
        true
      )
      .addField(
        "Todal video(s):",
        parseInt(datos.body.items[0].statistics.videoCount).toLocaleString(),
        true
      )
      .addField(
        "Link",
        `[${canal.body.items[0].snippet.channelTitle}](https://www.youtube.com/channel/${canal.body.items[0].id.channelId})`
      );
    message.channel.send(embedSeach);
  },
};
