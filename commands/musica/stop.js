module.exports = {
  name: "stop",
  category: "musica",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `ping`,
  run: async (client, message, args, discord) => {

    const queue = client.queue
    const serverQueue = queue.get(message.guild.id)

    if(!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz')
    if(!serverQueue) return message.channel.send('No hay canciones en la cola')

    serverQueue.songs = [];
    await serverQueue.connection.dispatcher.end()


  },
};
