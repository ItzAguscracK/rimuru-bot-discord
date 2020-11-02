const discordTTS = require("discord-tts");
module.exports = {
  name: "tts",
  category: "interaccion",
  description: "Comando say pero en audio.",
  usage: `tts <mensaje>`,
  run: async (client, message, args) => {

    const voiceChannel = message.member.voice.channel
    const say = args.join(' ')


    if(!voiceChannel) return message.channel.send('Debes estar conectado a un canal de voz')
    if(!say) return message.channel.send('No has escrito ningun mensaje')

    message.delete();


    try {
      voiceChannel.join().then(connection => {
        const stream = discordTTS.getVoiceStream(say, lang="es-ES", speed=1)
        const dispatcher = connection.play(stream)
        dispatcher.on('finish', () => voiceChannel.leave())
    })
    } catch (error) {
      console.log(error);
      return message.channel.send('Oops, ocurrio un error, intentalo mas tarde!').then((m) => m.delete({ timeout: 5000 }));
    }




  },
};
