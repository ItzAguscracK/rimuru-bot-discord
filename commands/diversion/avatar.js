const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "diversion",
  description: "Obten el avatar de los demas usuarios o el tuyo.",
  usage: `avatar [mencion]`,
  run: async (client, message, args) => {
    let miembro = message.mentions.users.first() || message.author;

    const avatarEmbed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setTitle(`Avatar de ${miembro.username}`)
      .setColor("RANDOM")
      .setImage(miembro.displayAvatarURL({ size: 2048 }))
      .setFooter(`Solicitado por ${message.author.username}`);

    message.channel.send(avatarEmbed);
  },
};
