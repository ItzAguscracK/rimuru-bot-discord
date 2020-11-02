const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  aliases: ["ayuda", "h"],
  category: "info",
  description: "Obtenga informacion del bot y sus comandos.",
  usage: `help [nombreDelComando]`,
  run: async (client, message, args) => {
    if (args[0]) {
      return getCMD(client, message, args[0]);
    } else {
      return helpMSG(client, message);
    }
  },
};

function helpMSG(client, message) {
  const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Rimuru")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `Para ver la lista completa de comandos, escriba \`${process.env.PREFIX}commands\` \n\nPara ver informacion especifica de un comandos, escriba \`${process.env.PREFIX}help <commando>\` sin \`<>\``
    )
    .addField("Sobre mi", "Escribir algo hermoso aqui")
    .addField("Links", "YouTube | Twitter | PayPal | Twitch")
    .setFooter(`Solicitado por ${message.author.username}`);
  message.channel.send(embed);
}

function getCMD(client, message, input) {
  const embed = new MessageEmbed();

  const cmd =
    client.commands.get(input.toLowerCase()) ||
    client.commands.get(client.aliases.get(input.toLowerCase()));

  let info = `No hay informacion para el comando **${input.toLowerCase()}**`;

  if (!cmd) {
    return message.channel.send(embed.setColor("#ff0000").setDescription(info));
  }

  if (cmd.name) info = `**Nombre del Comando**: ${cmd.name}`;
  if (cmd.aliases)
    info += `\n**Alias**: ${cmd.aliases.map((a) => `\`${a}\``).join(", ")}`;
  if (cmd.description) info += `\n**Descripcion**: ${cmd.description}`;
  if (cmd.usage) {
    info += `\n**Uso**: ${cmd.usage}`;
    embed.setFooter("<> = REQUERIDO | [] = OPCIONAL");
  }
  if (cmd.usage2) info += `\n**Uso 2**: ${cmd.usage2}`;

  return message.channel.send(
    embed.setColor(process.env.COLOR).setDescription(info)
  );
}
