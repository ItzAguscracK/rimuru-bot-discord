const translate = require("@k3rn31p4nic/google-translate-api");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "translate",
  aliases: ['ts'],
  category: "utilidad",
  description: "Traduce texto de un idioma a otro.",
  usage: `translate <idioma> <mensaje>`,
  run: async (client, message, args) => {

    const idioma = args[0]
    const texto = args.slice(1).join(' ')

    if(!idioma) return message.channel.send('Especifica el idioma a traducir del texto, `proxima actualización lang-list`').then((m) => m.delete({ timeout: 5000 }));
    if(!texto) return message.channel.send('Debes ecribir algo para traducir').then((m) => m.delete({ timeout: 5000 }));

    translate(texto, {to: idioma}).then(res => {
        const embed = new MessageEmbed()
        .setTitle('<:traductor:773340326239797298> Traductor')
        .addField('Texto a traducir: ', '`'+texto+'`', true)
        .addField('Traducción: ', '`'+res.text+'`', true)
        .setColor('RANDOM')
        .setFooter(`Traducción pedida por ${message.author.username}`)
        return message.channel.send(embed)
    }).catch(err => {
        console.log(err);
    })
  },
};
