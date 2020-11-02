const { MessageEmbed } = require("discord.js");
const chance = require('chance').Chance();

module.exports = {
  name: "hack",
  category: "diversion",
  description: "Conviertete en un hacker y roba la informacion de los usuarios.",
  usage: `hack <mencion>`,
  run: async (client, message, args) => {
    let dominios = [
        "gmail.com",
        "hotmail.com",
    ];
    let usuario = message.mentions.users.first();
    let autor = message.author;
    var correos = dominios[Math.floor(Math.random() * dominios.length)];
    if (!usuario){
        message.delete({ timeout: 5000})
        message.channel.send("Debes mencionar a un usuario").then( m => {
            m.delete({ timeout: 5000 })
        });
        return;
    }

    if(usuario = autor) return message.channel.send("No puedes hackearte a ti mismo").then( m => {
      m.delete({ timeout: 5000 })
  });
 
    let ip = chance.ip();
    let numero = chance.phone({ country: 'us', mobile: true});
    let correo = chance.email({domain: correos});
    let contraseña = chance.word({ lenght: 8 });

    const hackeo = new MessageEmbed()
    .setDescription(`${autor} a hackeado a ${usuario}`)
    .addField("Ip: ", ip)
    .addField("Telefono: ", numero)
    .addField("Correo: ", correo)
    .addField("Contraseña: ", contraseña)
    .setThumbnail(usuario.displayAvatarURL({ size: 2048 }))
    .setColor(`RED`);
    message.channel.send(hackeo);
  },
};
