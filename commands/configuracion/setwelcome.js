const welcome = require("../../models/GuildConfig");

module.exports = {
  name: "setwelcome",
  aliases: ["welcome", "channelw", "welcomeChannel"],
  category: "administracion",
  description: "Configura el canal de bienvenidas.",
  usage: `setwelcome <canalMencion>`,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("No tienes permisos para esto");
    }

    let canal = message.mentions.channels.first();

    if (!canal) {
      return message.channel.send("Debes mencionar un canal");
    }

    let w = await welcome
      .findOne({
        guildId: message.guild.id,
      })
      .exec();

    if (w) {
      await w.updateOne({
        guildId: message.guild.id,
        memberWelcomeChannel: canal.id,
      });

      message.channel.send(
        "El nuevo canal de bienvenidas sera <#" + canal.id + ">."
      );
    }


    let can = await welcome.findOne({
      guildId: message.guild.id,
    });

    if (!can) {
      return message.channel.send("No hay ningun canal configurado");
    }

    let wcanal = message.guild.channels.cache.get(can.memberWelcomeChannel);

    wcanal.send("Este canal sera el de bienvenidas");
  },
};
