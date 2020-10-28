const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dance",
  category: "diversion",
  description: "Demuestrales a todos que eres el rey/na del baile.",
  usage: `dance`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.dance();
    
    const danceEmbed = new MessageEmbed()
    .setDescription(`**${author}** se puso a bailar!`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(danceEmbed);

  },
};