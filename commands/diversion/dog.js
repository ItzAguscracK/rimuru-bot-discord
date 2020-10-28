const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dog",
  category: "diversion",
  description: "Recibe un perro.",
  usage: `dog`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.dog();
    
    const dogEmbed = new MessageEmbed()
    .setDescription(`**${author}** recibio un perro :dog:`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(dogEmbed);
  },
};