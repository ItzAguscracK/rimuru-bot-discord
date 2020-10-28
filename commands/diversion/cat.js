const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cat",
  category: "diversion",
  description: "Recibe un gatito :cat:.",
  usage: `cat`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.cat();
    
    const catEmbed = new MessageEmbed()
    .setDescription(`**${author}** recibio un gato :cat:`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(catEmbed);

  },
};
