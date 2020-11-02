
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "invite",
  category: "interaccion",
  description: "Invitame a tu servidor.",
  usage: `invite`,
  run: async (client, message, args) => {

    let invite = 'https://discord.com/oauth2/authorize?client_id=750438119450476635&scope=bot&permissions=473427046'
    const invitateEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Invitame', client.user.avatarURL())
    .setDescription('¿Quieres tenerme a tu disposición? ¿Quieres al mejor BOT de Discord? Entonces que esperas para invitarme a tu servidor, ayudame a crecer para poder ir trayendo mas caracteristicas nuevas!\n[Invitame]('+invite+')')
    return message.channel.send(invitateEmbed)
  },
};
