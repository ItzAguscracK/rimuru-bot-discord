const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "donate",
  aliases: ['donar', 'support'],
  category: "info",
  description: "Apoya el proyecto con una donacion.",
  usage: `donate`,
  run: async (client, message, args) => {

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setAuthor('Donaciones', client.user.avatarURL())
      .setDescription('Actualmente contamos con `PayPal` para recibir donaciones.\nDonando se desbloquean caracteristicas premiums y contenido exclusivo! :heart:\n\n**PayPal**\n[Clic aqui para donar](https://paypal.me/RimuruGamerDevv)')
    message.author.send(embed);

    message.channel.send(':white_check_mark: | Has recibido la informacion de donacion en tus mensajes privados.').then((m) => m.delete({ timeout: 5000 }));
  },
};
