const suggest = require("../../models/GuildConfig");

module.exports = {
  name: "setsuggest",
  aliases: ["suggest", "sugChannel", "suggestChannel"],
  category: "administracion",
  description: "Configura el canal de sugerencias.",
  usage: `setsuggest <canalMencion>`,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("No tienes permisos para esto");
    }

    let canal = message.mentions.channels.first();

    if (!canal) {
      return message.channel.send("Debes mencionar un canal");
    }

    let w = await suggest
      .findOne({
        guildId: message.guild.id,
      })
      .exec();

    if (w) {
      await w.updateOne({
        guildId: message.guild.id,
        suggestChannel: canal.id,
      });

      message.channel.send(
        "El nuevo canal de bienvenidas sera <#" + canal.id + ">."
      );
    }


    let can = await suggest.findOne({
      guildId: message.guild.id,
    });

    if (!can) {
      return message.channel.send("No hay ningun canal configurado");
    }

    let wcanal = message.guild.channels.cache.get(can.suggestChannel);

    wcanal.send("Este canal sera el de sugerencias");
  },
};
