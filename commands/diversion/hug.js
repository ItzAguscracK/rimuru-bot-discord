const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "hug",
  category: "diversion",
  description: "Abraza a alguien.",
  usage: `hug <mencion>`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let autor = message.author;
    let usuario = message.mentions.users.first();
    let url = await marsnpm.hug();

    if(!usuario) return message.channel.send(`${autor} debes mencionar a alguien!`);
    
    const hugEmbed = new MessageEmbed()
    .setDescription(`**${author}** abrazo a ${usuario}`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(hugEmbed);
  },
};