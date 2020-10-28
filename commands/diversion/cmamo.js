const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cmamo",
  category: "diversion",
  description: "Cmamo.",
  usage: `cmamo`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.c_mamo();
    
    const cmamoEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(cmamoEmbed);

  },
};
