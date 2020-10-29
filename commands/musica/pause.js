module.exports = {
  name: "pause",
  category: "info",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `ping`,
  run: async (client, message, args) => {
    const queue = client.queue
    const serverQueue = queue.get(message.guild.id)

    if(!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz')
    if(!serverQueue) return message.channel.send('No hay canciones en la cola')


    if(serverQueue && serverQueue.playing){
        serverQueue.playing = false
        console.log('En pausa');
        serverQueue.connection.dispatcher.pause(true)
    }


    message.channel.send('Cancion pausada')
  },
};
