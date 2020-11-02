const translate = require("@k3rn31p4nic/google-translate-api");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "translate",
  aliases: ['ts'],
  category: "interaccion",
  description: "Traduce texto de un idioma a otro.",
  usage: `translate <idioma> <mensaje>`,
  run: async (client, message, args) => {

    const idioma = args[0]
    const texto = args.slice(1).join(' ')

    if(!idioma) return message.channel.send('Especifica el idioma a traducir del texto, puedes ver la lista con r!ts langs-list')
    if(!texto) return message.channel.send('Debes ecribir algo para traducir')

    translate(texto, {to: idioma}).then(res => {
        const embed = new MessageEmbed()
        .setTitle('Traductor')
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
