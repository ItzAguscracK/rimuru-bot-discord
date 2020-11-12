const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
module.exports = {
  name: "ping",
  category: "interaccion",
  description: "Obten la latencia del BOT, la API en milisegundos y la Conexion a la Base de Datos.",
  usage: `ping`,

  run: async (client, message, args) => {
    const msg = await message.channel.send("🏓 Pong");
    const pings = [`📨 Envio de mensajes: ${Date.now() - message.createdTimestamp}ms`, `📡 DiscordAPI: ${client.ws.ping}ms`]
    const dbPing = await new Promise((s, r) => {

      try {
        const dates = Date.now()
        mongoose.connection.db.admin().ping(function (err, result){
          if(err || !result) return r(err || new Error('Error to catch the ping from the DB'))
          s(Date.now() - dates)
        })
      } catch (error) {
        r(error)
      }
    })
    pings.push(`🗃️ DB ping: ${dbPing}ms`)

    await msg.edit(pings.join('\n\n'))
  },
};
