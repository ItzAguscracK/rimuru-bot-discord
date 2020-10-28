const ticketModel = require('../models/ticketConfig')
module.exports = async (reaction, user) => {

    if(user.bot) return;

    let data = ticketModel.findOne({
        guildId: reaction.message.guild.id
    })

    if(!data) return

    if(data.tickets.length){

        let ticket = data.ticket.find(ticket => ticket.msg === reaction.message.id)

        if(ticket){
            let channel = client.channels.cache.get(ticket.channel)
            let user = client.user.cache.get(ticket.user)

            if(ticket.state === 'open'){
                if(reaction.emoji.name === ':eyes:'){

                    await reaction.message.delete()
                    let msg = await channel.send('¿Seguro que cerraras el ticket?')

                    ticket.msg = msg.id
                    ticket.state = 'closed'
                    await data.save()
                    await msg.react('')
                }
            }
        }
    }

}