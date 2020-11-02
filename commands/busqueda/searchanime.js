module.exports = {
  name: "searchanime",
  aliases: ["sanime", "searcha", "anime"],
  category: "busqueda",
  description: "Busca informacion sobre animes.",
  usage: `searchanime <nombreAnime | manga>`,
  run: async (client, message, args) => {

    message.delete()
    return message.channel.send('En desarrollo').then((m) => m.delete({ timeout: 5000 }));
  },
};
