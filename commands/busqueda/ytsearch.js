const YouTube = require("youtube-node");
module.exports = {
  name: "ytsearch",
  aliases: ["yts", "buscarYT"],
  category: "busqueda",
  description: "Busca un video en YouTube",
  usage: `ytsearch <nombreVideo>`,
  run: async (client, message, args) => {
    let youTube = new YouTube();
    youTube.setKey(process.env.GOOGLE);
    let nombreyt = args.join(" ");

    if (!nombreyt)
      return message.channel
        .send("Debe proporcionar algo para buscar")
        .then((m) => m.delete({ timeout: 5000 }));

    message.channel.send("🔎 `Buscando..!`").then((m) => {
      youTube.search(args.join(" "), 2, function (err, result) {
        if (err) {
          return console.log(err);
        }
        if (result.items[0]["id"].videoId == undefined) {
          return message.channel
            .send("¡No se han encontrado resultados!")
            .then((m) => m.delete({ timeout: 10000 }));
        } else {
          let link = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`;
          m.edit(link);
        }
      });
    });
  },
};
