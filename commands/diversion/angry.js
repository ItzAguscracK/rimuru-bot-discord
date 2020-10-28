const { MessageEmbed } = require("discord.js");
const chance = require('chance').Chance();

module.exports = {
  name: "angry",
  category: "diversion",
  description: "Enojate con toda tu furia.",
  usage: `angry`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.angry();
    
    const angryEmbed = new MessageEmbed()
    .setDescription(`**${author}** esta enojado! :angry:`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(angryEmbed);

  },
};
