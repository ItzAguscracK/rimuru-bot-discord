const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "syntaxis",
  aliases: ['sy'],
  category: "interaccion",
  description: "Uso de markdown de discord",
  usage: `syntaxis <markdown> <mensaje>`,
  run: async (client, message, args) => {

    const sintaxis = args[0]
    const say = args.slice(1).join(" ")

    if(!sintaxis) return message.channel.send('No sinyaxois')
    if(!say) return message.channel.send('No messages')

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Syntaxis")
      .setDescription('```'+sintaxis+'\n'+say+'\n```')
      .setFooter('Markdown: '+sintaxis)

    message.channel.send(embed);
  },
};
