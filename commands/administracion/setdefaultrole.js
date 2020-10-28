const role = require("../../models/GuildConfig");

module.exports = {
  name: "setdefaultrole",
  aliases: ["strole", "roleDefault"],
  category: "administracion",
  description: "Configura el/los roles por defecto.",
  usage: `setdefaultrole <rolMencion>`,
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send("No tienes permisos para esto");
    }
    let rol = message.mentions.channels.first();

    if (!canal) {
      return message.channel.send("Debes mencionar un rol");
    }

    let w = await role
      .findOne({
        guildId: message.guild.id,
      })
      .exec();

    if (w) {
      await w.updateOne({
        guildId: message.guild.id,
        defaultRole: rol.id,
      });

      message.channel.send(
        "El nuevo rol por defecto sera <@" + rol.id + ">."
      );
    }
  },
};
