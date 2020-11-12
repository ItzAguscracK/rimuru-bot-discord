const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "syntaxis",
  aliases: ['sy'],
  category: "utilidad",
  description: "Uso de markdown",
  usage: `syntaxis <markdown> <mensaje>`,
  run: async (client, message, args) => {

    const sintaxis = args[0]
    const say = args.slice(1).join(" ")

    if(!sintaxis) return message.channel.send('Debes ingresar una sintaxis.').then((m) => m.delete({ timeout: 5000 }));
    if(!say) return message.channel.send('Debes escribir un mensaje.').then((m) => m.delete({ timeout: 5000 }));

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Syntaxis")
      .setDescription('```'+sintaxis+'\n'+say+'\n```')
      .setFooter('Markdown: '+sintaxis)

    message.channel.send(embed);
  },
};
