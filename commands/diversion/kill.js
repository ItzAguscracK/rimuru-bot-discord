const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kill",
  category: "diversion",
  description: "Asesina a alguien",
  usage: `kill <mencion>`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let autor = message.author;
    let usuario = message.mentions.users.first();
    let url = await marsnpm.kill();

    if (!usuario) return message.channel.send(`${autor} debes mencionar a alguien!`);
    
    const killEmbed = new MessageEmbed()
    .setDescription(`**${author}** asesino a ${usuario}`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(killEmbed);
  },
};