const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "like",
  category: "diversion",
  description: "Te gusta lo que dicen",
  usage: `like`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.like();

    const randomMessages = [`**${author}** aprueba esto`, `Esto le ha gustado a **${author}**`, `**${author}** le da like!`, `Segun **${author}**, esto esta buenisimo`];
    
    const likeEmbed = new MessageEmbed()
    .setDescription(`**${author}** le da like!`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(likeEmbed);
  },
};