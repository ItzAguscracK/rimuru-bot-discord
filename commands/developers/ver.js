const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "ver",
    category: "developers",
    description: "Este es un comando de pruebas, wow!.",
    usage: `tests`,
    run: async (client, message, args) => {

        message.delete()
        const embed = new MessageEmbed()
        .setAuthor('• Rιɱυɾυ • 『𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆』', 'https://cdn.discordapp.com/icons/727372120371232788/243ec999d04273a53e78d112f69b665d.jpg?size=256')
        .setTitle('Sistema de Verificación')
        .setDescription('Para verificarte en el servidor, ve a el canal <#776532020087226369> y escribe `r!verify`\n\n- Al verificarte en el servidor estaras aceptando las reglas del mismo publicadas en el canal <#762213984958677032>.')
        .setThumbnail('https://cdn.discordapp.com/icons/727372120371232788/243ec999d04273a53e78d112f69b665d.jpg?size=256')
        .setColor('PURPLE')
        .setTimestamp()
        .setFooter('Staff • Rιɱυɾυ • 『𝗖𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆』 - 2020')
        
        return message.channel.send(embed)
    },
  };
  