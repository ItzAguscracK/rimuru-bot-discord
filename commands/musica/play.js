const { MessageEmbed } = require("discord.js");
const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(process.env.APIYoutube);

module.exports = {
  name: "play",
  aliases: ['p'],
  category: "musica",
  description: "Reproduce musica",
  usage: `play <enlace || nombre>`,
  run: async (client, message, args) => {
    const queue = client.queue;

    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send("Debes estar conectado al canal de voz")
    let guild = message.guild

    async function play(guild, song) {
      const serverQueue = await queue.get(guild.id);

      if(!song) {
        await serverQueue.voiceChannel.leave();
        await queue.delete(guild.id);
        return;
      }

      const stream = await ytdl(song.url, {
        filter: 'audioonly',
        highWaterMark: 1 << 25
      })
      
      const dispatcher = await serverQueue.connection.play(stream)
        .on('finish', async () => {
          serverQueue.songs.shift();

          play(guild, serverQueue.songs[0])

        })
        .on('error', (error) => console.log(error));

        dispatcher.setVolume(serverQueue.volume)

        let durationHours = song.duration.hours < 9 ? '0'+song.duration.hours : song.duration.hours;
        let durationMinutes = song.duration.minutes < 9 ? '0'+song.duration.minutes : song.duration.minutes;
        let durationSeconds = song.duration.seconds < 9 ? '0'+song.duration.seconds : song.duration.seconds;
        const embedNew = new MessageEmbed()
          .setTitle(song.title)
          .setColor('RED')
          .setThumbnail(song.thumbnail)
          .setDescription('Duración: `'+durationHours+':'+durationMinutes+':'+durationSeconds+'`')
          .setURL(song.url)
          .setFooter(song.publish)

        return message.channel.send(`Reproduciendo ahora:`, {embed: embedNew})

    }

    async function handleVideo(video, playlist) {
      const serverQueue = await queue.get(guild.id);
      const song = {
        title: video.title,
        id: video.id,
        duration: video.duration,
        publish: video.publishedAt,
        thumbnail: video.thumbnails.default.url,
        url: `https://www.youtube.com/watch?v=${video.id}`
      }

      if(serverQueue){
        //Ya existe
        await serverQueue.songs.push()
        if(playlist) return;

        let durationHours = song.duration.hours < 9 ? '0'+song.duration.hours : song.duration.hours;
        let durationMinutes = song.duration.minutes < 9 ? '0'+song.duration.minutes : song.duration.minutes;
        let durationSeconds = song.duration.seconds < 9 ? '0'+song.duration.seconds : song.duration.seconds;
        
        const embedQueue = new MessageEmbed()
          .setTitle(song.title)
          .setColor('RED')
          .setThumbnail(song.thumbnail)
          .setDescription('Duración: `'+durationHours+':'+durationMinutes+':'+durationSeconds+'`')
          .setURL(song.url)
          .setFooter(song.publish)
        return message.channel.send(embedQueue);

      } else {
        //No existe
        const queueConstruct = {
          textChannel: message.channel,
          voiceChannel,
          connection: null,
          songs: [],
          playing: true,
          volume: 0.5
        }

        await queue.set(guild.id, queueConstruct)
        await queueConstruct.songs.push(song)

        const connection = await voiceChannel.join()
        queueConstruct.connection = connection;

        await play(guild, queueConstruct.songs[0])
      }
    }

    if(!args[0]) return message.channel.send('Debes agregar un enlace de YouTube');
    let video;

    if(ytdl.validateURL(args[0])){
      video = await youtube.getVideo(args[0])
      //console.log(video);
    } else {
      let song = args.join(' ');

      try {
        let videos = await youtube.searchVideos(song, 10)
        if(!videos.length) return message.channel.send('No hay resultados en la busqueda!')
        let index = 0
        const embed = new MessageEmbed()
          .setDescription(`${videos.map((video) => `**${++index}** - ${video.title}`).join('\n')}`)
          .setColor('RED');
  
        message.channel.send(embed)
  
        let optionsSearch;
        try {
          optionsSearch = await message.channel.awaitMessages((msg2) => msg2.content > 0 && msg2.content < 11 && message.author.id === msg2.author.id, {
            max: 1,
            time: 30000,
            errors: ['time']
          });
        } catch (error) {
          return message.channel,send('La opcion de busqueda se ha cancelado')
        }

        const videoIndex = parseInt(optionsSearch.first().content, 10);
  
        video = await youtube.getVideoByID(videos[videoIndex - 1].id)
  
        console.log(videos)        
      } catch (error) {
        return message.channel.send('Oops, parece que hubo un error en la busqueda de resultados')
      }


    }    


    handleVideo(video, false);
  },
};