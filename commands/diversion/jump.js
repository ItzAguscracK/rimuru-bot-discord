const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "jump",
  category: "diversion",
  description: "Salta, salta hasta las nubes-",
  usage: `jump`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.jump();
    
    const jumpEmbed = new MessageEmbed()
    .setDescription(`**${author}** se puso a saltar!`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(jumpEmbed);
  },
};