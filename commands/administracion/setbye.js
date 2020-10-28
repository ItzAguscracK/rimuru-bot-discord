const bye = require("../../models/GuildConfig");

module.exports = {
  name: "setbye",
  aliases: ["stbye", "stdespedida",  "channelb", "byeChannel"],
  category: "administracion",
  description: "Configura el canal de despedidas.",
  usage: `setbye <canalMencion>`,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("No tienes permisos para esto");
    }
    let canal = message.mentions.channels.first();

    if (!canal) {
      return message.channel.send("Debes mencionar un canal");
    }

    let w = await bye
      .findOne({
        guildId: message.guild.id,
      })
      .exec();

    if (w) {
      await w.updateOne({
        guildId: message.guild.id,
        memberByeChannel: canal.id,
      });

      message.channel.send(
        "El nuevo canal de despedidas sera <#" + canal.id + ">."
      );
    }


    let can = await bye.findOne({
      guildId: message.guild.id,
    });

    if (!can) {
      return message.channel.send("No hay ningun canal configurado");
    }

    let wcanal = message.guild.channels.cache.get(can.memberByeChannel);

    wcanal.send("Este canal sera el de despedidas");
  },
};
