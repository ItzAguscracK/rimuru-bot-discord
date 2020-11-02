const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  category: "info",
  description: "Obten el avatar de un usuario.",
  usage: `avatar [mencion]`,
  run: async (client, message, args) => {

    //Defino usuarios
    let users = message.mentions.users.first() || message.author;

    //Si el usuario es mencionado
    if(message.mentions.users.first()){
        const embedAvatar = new MessageEmbed()
        .setTitle('Avatar de '+users.username)
        .setImage(users.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setFooter('Solicitado por '+message.author.username)
    
        return message.channel.send(embedAvatar);

    //Si el usuario es el autor
    } else {
        const embedAutorAvatar = new MessageEmbed()
        .setTitle('Avatar de '+users.username)
        .setImage(users.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        return message.channel.send(embedAutorAvatar)
    }

  },
};
