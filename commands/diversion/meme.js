const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "meme",
  category: "diversion",
  description: "Memes, momos, riete un rato",
  usage: `meme`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.meme();
    
    const memeEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setImage(url)
    .setFooter(`Solicitado por ${message.author.username}`)

    message.channel.send(memeEmbed);
  },
};