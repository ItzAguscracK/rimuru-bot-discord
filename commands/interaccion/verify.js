module.exports = {
    name: "verify",
    category: "interaccion",
    description: "Verificacion en servidor oficial de Rimuru.",
    usage: `verify`,
    run: async (client, message, args) => {
        message.delete()

        
            //message.member.roles.add('753759760137977866')
            //return message.author.send("✅ | Te has verificado correctamente");
    

        if(!message.guild.channels.cache.get(`776532020087226369`)) return message.channel.send('Debes estar en el servidor oficial de Rimuru');
        

        
    },
  };
  