const ticket = require('../../models/ticketConfig')
module.exports = {
  name: "ping",
  category: "info",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `ping`,
  run: async (client, message, args) => {

    if(!message.member.hasPermission('MANAGUE_GUILD')) return message.channel.send('Necesitas perms manague guild')

    let msg = await message.channel.send('Reacciona con :eyes: para crear un ticket')

    let data = await ticket.findOne({
        guildId: message.guild.id
    })

    new_data = new ticket({
        guildId: message.guild.id,
        ticket_msg: msg.id
    })

    data ? await data.updateOne({ ticket_msg: msg.id }) : await new_data.save()

  },
};
