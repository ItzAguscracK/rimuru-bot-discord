const prefix = require("../../models/GuildConfig");

module.exports = {
  name: "setprefix",
  aliases: ["prefix", "changeprefix", "sprefix"],
  category: "configuracion",
  description: "Cambia el prefijo del bot.",
  usage: `setprefix <nuevoPrefijo>`,
  run: async (client, message, args) => {
    let newPrefix = args[0];

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("No tienes permisos para esto");
    } else if (!newPrefix) {
      return message.channel.send("Escribe el nuevo prefijo");
    } else if (newPrefix.length < 5) {
      return message.channel.send(
        "El nuevo prefijo no puede ser mayor a 5 caracteres"
      );
    }

    let prefijo = await prefix
      .findOne({
        guildId: message.guild.id,
      })
      .exec();

    if (prefijo) {
      await prefijo.updateOne({
        guildId: message.guild.id,
        prefix: newPrefix,
      });
      message.channel.send(
        "El prefijo se ha cambiado correctamente a `" + newPrefix + "`."
      ).then((m) => m.delete({ timeout: 10000 }));
    } else {
      let prefix2 = new prefix({
        guildId: message.guild.id,
        prefix: newPrefix,
      });
      await prefix2.save();
      message.channel.send("El prefijo se ha establecido correctamente!").then((m) => m.delete({ timeout: 10000 }));
    }
  },
};
