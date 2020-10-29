module.exports = {
    name: "volume",
    category: "info",
    description: "Obten la latencia del BOT y la API en milisegundos.",
    usage: `ping`,
    run: async (client, message, args) => {
      const queue = client.queue
      const serverQueue = queue.get(message.guild.id)
      let volume = args[0]
      volume = parseInt(volume)

      if(!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz')
      if(!serverQueue) return message.channel.send('No hay canciones en la cola')
      if(!volume) return message.channel.send('Debes agregar un valor para el volumen')

      if(volume < 2) return message.channel.send('La cantidad para el valora del volumen debe ser menor a 2')

      if(volume > 0) return message.channel.send('La cantidad del valora para el volumen debe ser mayor a 0')
      
      serverQueue.volume = volume;
      serverQueue.connection.dispatcher.setVolume(volume)

      return message.channel.send('El volumen es de : **'+volume+'**')

    },
  };
  