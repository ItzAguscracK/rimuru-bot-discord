const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cry",
  category: "diversion",
  description: "Llora, llora, que tus lagrimas se vean.",
  usage: `cry`,
  run: async (client, message, args) => {
    const marsnpm = require("marsnpm");

    let author = message.author.username;
    let url = await marsnpm.cry();
    
    const cryEmbed = new MessageEmbed()
    .setDescription(`**${author}** esta llorando! :cry:`)
    .setColor("RANDOM")
    .setImage(url);

    message.channel.send(cryEmbed);

  },
};