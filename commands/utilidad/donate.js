const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "donate",
  aliases: ['donar', 'support'],
  category: "utilidad",
  description: "Apoya el proyecto con una donación.",
  usage: `donate`,
  run: async (client, message, args) => {

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor('Donaciones', client.user.avatarURL())
      .setDescription('Actualmente contamos con `PayPal` para recibir donaciones.\nDonando obtienes caracteristicas VIP´s en nuestro servidor y acceso a comandos Premium´s :heart:\n\n**PayPal**\n[Clic aqui para donar](https://paypal.me/RimuruGamerDevv)')
    message.author.send(embed);

    message.channel.send(':white_check_mark: | Has recibido la informacion de donacion en tus mensajes privados.').then((m) => m.delete({ timeout: 5000 }));
  },
};
