const ytdl = require('ytdl-core')
const YouTube = require('simple-youtube-api')
const youtube = new YouTube(process.env.APIYoutube)
module.exports = {
  name: "play",
  category: "musica",
  description: "Musica",
  usage: `play`,
  run: async (client, message, args, discord) => {

    const queue = client.queue;
    const voiceChannel = message.member.voice.channel;
    let guild = message.guild

    if(!voiceChannel) return message.channel.send('Debes estar conectado a un canal de voz')



    async function play(guild, song) {
        const serverQueue = await queue.get(guild.id)
        
        if(!song){
            await serverQueue.voiceChannel.leave()
            await queue.delete(guild.id)
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
          .on('error', (error) => console.log(error))

          dispatcher.setVolume(serverQueue.volume)

          return message.channel.send('Reproduciendo '+ song.title)
    }

    async function handleVideo(video, playlist) {
        const serverQueue = await queue.get(guild.id)
        const song = {
            title: video.title,
            id: video.id,
            url: `https://www.youtube.com/watch?v=${video.id}`
        }

        if (serverQueue){
            //Ya existe
            await serverQueue.songs.push(song)
            if(playlist) return;


        } else {
            //No existe
            const queueContructor = {
                textChannel: message.channel,
                voiceChannel,
                connection: null,
                songs: [],
                playing: true,
                volume: 1
            }
            
            await queue.set(guild.id, queueContructor)
            await queueContructor.songs.push(song)

            const connection = await voiceChannel.join()
            queueContructor.connection = connection

            await play(guild, queueContructor.songs[0])


        }

    }

    if(args[0]) return message.channel.send('Debes agregr un link de yt')
    let video = await youtube.getVideo(args[0])
    console.log(video);
    
    handleVideo(video, false)

  },
};
