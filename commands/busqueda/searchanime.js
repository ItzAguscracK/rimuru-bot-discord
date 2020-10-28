const { MessageEmbed } = require("discord.js");
const { search } = require('animeflv');
//Arreglar
module.exports = {
  name: "searchanime",
  aliases: ["sanime", "searcha", "anime"],
  category: "busqueda",
  description: "Busca informacion sobre animes.",
  usage: `searchanime <nombreAnime | manga>`,
  run: async (client, message, args) => {
    let name = args.join(" ");
    if(!name) return message.channel.send("Escribe el nombre de un manga u anime");

    await search(name).then(doc => {
      console.log(doc);
      let url = `https://www3.animeflv.net/${doc[0].id}`;
      const embed = new MessageEmbed()
      .setThumbnail(doc[0].poster)
      .setTitle(`Resultados de la Busqueda`)
      .setDescription(`[${doc[0].title}](${url})\n\n**Sinopsis:**\n${doc[0].synopsis}`)
      .addField("Generos", doc[0].genres)
      .addField("Episodios",Object.keys(doc[0].episodes).length, true)
      
      message.channel.send(embed);
    })
  },
};
