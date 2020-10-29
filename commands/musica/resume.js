module.exports = {
    name: "resume",
    category: "info",
    description: "Obten la latencia del BOT y la API en milisegundos.",
    usage: `ping`,
    run: async (client, message, args) => {
      const queue = client.queue
      const serverQueue = queue.get(message.guild.id)
  
      if(!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz')
      if(!serverQueue) return message.channel.send('No hay canciones en la cola')
  

      if(serverQueue && !serverQueue.playing){
          serverQueue.playing = true
          console.log('Reanudando');
          serverQueue.connection.dispatcher.resume()
          message.channel.send('Cancion pausada')
      }
  
      message.channel.send('No hay canciones detenidas')
  
      
    },
  };
  