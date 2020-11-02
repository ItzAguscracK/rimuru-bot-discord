const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  run: async (client, message, args) => {
    if (message.author.id !== "388078189618135041") {
      let embed = new MessageEmbed() //Creamos el embed
        .setDescription(
          "Mmm, no tienes los permisos suficientes para hacer esto"
        );
      message.channel.send(embed);
    }

    let toEval = args.join(" "); //Definimos toEval con argumentos
    if (!toEval) {
      //Creamos un if para que diga
      let embed = new MessageEmbed()
        .setDescription("Necesitas evaluar __*ALGO*__")
        .setColor("RANDOM");
      message.channel.send(embed).then((m) => m.delete(1000));
    }
    try {
      //Hacemos un try
      let evaluated = await eval(toEval); //"evaluated" va a evaluar el comando
      if (typeof evaluated !== "string") {
        evaluated = require("util").inspect(evaluated, { depth: 0 });
      }

      let beautify = require("beautify"); //Se usa beautify para que funcione
      let embed = new MessageEmbed() //Creamos otro embed
        .setColor("RANDOM")
        .setTimestamp() //Usamos un Timestamp
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTitle(":desktop: NombreBotEval")
        .setDescription("Este comando sirve para ejecutar codigos")
        .addField(
          "Codigo:",
          "```js\n" + beautify(args.join(" "), { format: "js" }) + "```"
        )
        .addField("Lo evaluado:", "```js\n" + evaluated + "```"); //Aca aparecera lo que se evalua
      message.channel.send(embed);
    } catch (err) {
      //Hacemos un catch y que defina err
      let embed2 = new MessageEmbed()
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .addField(
          "Hubo un error con el codigo que evaluaste",
          "```js\n" + err + "```"
        ) //Va a aparecer el error
        .setColor("RANDOM");
      message.channel.send(embed2);
    }
  },
};
