const { MessageEmbed } = require('discord.js');
const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, guild) => {
    try{

        let canal = guild.channels.cache.filter(x => x.type === 'text').filter(x => x.guild.me.permissions.has('SEND_MESSAGES') && x.guild.me.permissions.has('VIEW_CHANNEL')).first() //Filtras los canales que son de texto, luego los canales donde el bot tiene permisos de enviar mensajes y ver el canal y agarras al primero usando .first()
        let bienvenidaMSG = new MessageEmbed()
        .setTitle("Gracias por añadirme a tu servidor!")
        .setDescription('- **¡Hola!** Mi prefijo es \`r!\`.\n- Para empezar a utilizar todos los comandos escriba cualquier comando para agregarlo a nuestra base de datos.\n- Si quieres cambiar mi prefijo puedes utilizar \`r!prefix\`.\n- Si gustas ver una lista completa de todos los comandos escribe \`r!commands\`.\n- Si tienes dudas, sugerencias o tienes algun inconveniente ingresa a nuestro servidor de [soporte](https://discord.gg/zpxgsEA).\n\n**⇣ Siguenos en nuestras redes sociales ⇣**\n『[YouTube](https://www.youtube.com/channel/UCsNiNvCb3IH8yt74MTt0gyg) - [Twitch](https://www.twitch.tv/nuurgamer_official) - [Twitter](https://twitter.com/GamerNuu) - [Patreon](https://www.patreon.com/Rimuru_GamerDevv)』')
        .setColor(0x2AF3B6)
        .setTimestamp()
        .setFooter(`Ahora estamos en ${client.guilds.cache.size} servidores`)
        .setThumbnail(client.user.avatarURL());
    
        if(canal) canal.send(bienvenidaMSG) //Si existe el canal envia el mensaje

        const guildConfig = await GuildConfig.create({
            guildId: guild.id,
        });
        console.log("El bot ha sido agregado a nuesta base da datos");
    } catch(err) {
        console.log(err);
    }
}
