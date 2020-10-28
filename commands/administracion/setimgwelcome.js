//Todos los modules que necesitaremos
// $ npm i is-png
// $ npm i node-fetch
// $ npm i discord.js
// $ npm i mongoose
const imgw = require("../../models/imgConfig");
//Requerimos del Schema
const isPng = require("is-png");
//Ya les dire para que lo utilizaremos
const fetch = require("node-fetch");
// Instalamos node fetch
const Discord = require("discord.js");

//Exportamos en caso de Handler
module.exports = {
  name: "setimagewelcome",
  aliases: ["setimg", "setimage", "simg", "wimg"],
  category: "administracion",
  description: "Configura la imagen de bienvenida.",
  usage: `setimage <imagen || url>`,
  run: async (client, message, args) => {

    //Verificamos que sea un link o un arhivo
    const link =
      (message.attachments.first()
        ? message.attachments.first().url
        : undefined) || args[1];

    //Si no es un link respondemos    
    if (!link) return message.channel.send("No subiste un archivo o un link");
    
    // Utilizamos node-fetch para hacer un fetch
    const res = await fetch(link);

    //Definimos el buffer
    const buffer = await res.buffer();

    //Aca voy a hacer una aclaracion, subir una imagen a una base de datos, en este caso nuestro Cluster de Mongo
    // es muy pesado, por lo cual deberemos decirle que si el archivo pesa mas de x peso definido, respondemos con "muy pesado"
    if (buffer.length > 200000) return message.channel.send("Muy pesado");

    //Aqui utilizamos el modulo de isPng para verificar que el arhivo/buffer es un .png que pesan menos
    if (isPng(buffer)) return message.channel.send("No es un .png");

    //Para guardar la imagen en nuestra base de datos como string utilizaremos base64, para guardarlo como un string
    const base64 = buffer.toString("base64");

    //Buscaremos en nuestra db el servidor de donde utilizaremos la img
    const msgDocument = await imgw.findOne({
      guildId: {
        $eq: message.guild.id,
      },
    });

    //Si esta, actualizaremos a la imagen
    if (msgDocument) {
      await msgDocument.updateOne({
        image: base64,
      });
    } else // Sino, creamos y guardamos
      await imgw.create({
        guildId: message.guild.id,
        image: base64,
      });

      //Mandamos un msg que esta todo OK
    message.channel.send("Imagen subida a la DB");
  },
};
