const imgw = require("../../models/imgConfig");
const isPng = require("is-png");
const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = {
  name: "setimg",
  description: "Este comando es premium. Sirve para poner una imagen de bienvenida",
  usage: `setimage <imagen || url>`,
  run: async (client, message, args) => {

    const link =
      (message.attachments.first()
        ? message.attachments.first().url
        : undefined) || args[1];

    if (!link) return message.channel.send("No subiste un archivo o un link").then((m) => m.delete({ timeout: 10000 }));
    
    const res = await fetch(link);
    const buffer = await res.buffer();

    if (buffer.length > 200000) return message.channel.send("Muy pesado").then((m) => m.delete({ timeout: 10000 }));


    if (isPng(buffer)) return message.channel.send("La imagen debe ser un archivo `.png`").then((m) => m.delete({ timeout: 10000 }));
   
    const base64 = buffer.toString("base64");
    const msgDocument = await imgw.findOne({
      guildId: {
        $eq: message.guild.id,
      },
    });

    if (msgDocument) {
      await msgDocument.updateOne({
        image: base64,
      });
    } else 
      await imgw.create({
        guildId: message.guild.id,
        image: base64,
      });


    message.channel.send("La imagen se ha subido correctamente!").then((m) => m.delete({ timeout: 10000 }));
  },
};
