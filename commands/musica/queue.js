const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "queue",
    aliases: ['list', 'q'],
    category: "musica",
    description: "Lista de musica en cola **Temporalmente deshabilitado**",
    usage: `queue`,
    run: async (client, message, args) => {
 
        //message.delete();
        //message.reply('Temporalmente deshabilitado').then((m) => m.delete({ timeout: 5000 }));
        
      const queue = client.queue;
      const serverQueue = queue.get(message.guild.id);
  
      if(!serverQueue) return message.channel.send('No hay canciones reproduciendose')
        
      if(serverQueue.songs.lenght === 0) return message.channel.send('No caniones en la cola')

    const queueSongs = serverQueue.songs;


    let listSongs = queueSongs.slice(1, 10).map(song => {
        let durationHours = song.duration.hours < 9 ? '0'+song.duration.hours : song.duration.hours;
        let durationMinutes = song.duration.minutes < 9 ? '0'+song.duration.minutes : song.duration.minutes;
        let durationSeconds = song.duration.seconds < 9 ? '0'+song.duration.seconds : song.duration.seconds;

        return `**-** ${song.title} - **__${durationHours}:${durationMinutes}:${durationSeconds}__**`;
    })

      const queueEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`Reproduciendo ahora:\n**${queueSongs[0].title}**\n\n==========================\n${listSongs.join('\n')}`)

      return message.channel.send('Lista de canciones para el servidor **'+message.guild.name+'**', {embed: queueEmbed})

    },
  };