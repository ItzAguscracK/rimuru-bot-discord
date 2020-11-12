const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "server",
  aliases: ['serverinfo'],
  category: "utilidad",
  description: "Obtenga información del servidor.",
  usage: `server`,
  run: async (client, message, args) => {

    let server = message.guild

    const embedServer = new MessageEmbed()
    .setTitle('**Información del Servidor**')
    .setThumbnail(server.iconURL({ dynamic: true }))
    .setAuthor(server.name, server.iconURL())
    .addField('**ServerID**', server.id, true)
    .addField('**Creación**', server.joinedAt.toLocaleDateString("es-ar"), true)
    .addField('**Región**', server.region, true)

    .addField('**Dueño del Servidor**', server.owner.user, true)
    .addField('**OwnerID: **', server.ownerID, true)

    .addField(`**CANALES** [${server.channels.cache.size}]`, `Categorias: **${server.channels.cache.filter(x => x.type === 'category').size}** Texto: **${server.channels.cache.filter(x => x.type === 'text').size}** Voz: **${server.channels.cache.filter(x => x.type === 'voice').size}**`)

    .addField('**Miembros**', server.memberCount, true)
    .addField('Bots', server.members.cache.filter(m => m.user.bot).size, true)
    .addField('**Roles**', server.roles.cache.size,true)
    .addField('Emojis', server.emojis.cache.size, true)

    .addField('**Boosteos**', server.premiumSubscriptionCount.toString(), true)
    .addField('**Verificación**', server.verificationLevel, true)
    .setColor('RANDOM')
    return message.channel.send(embedServer)
  },
};
