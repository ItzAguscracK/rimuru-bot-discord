module.exports = {
  name: "say",
  category: "diversion",
  description: "Comando decir.",
  usage: `say <mensaje>`,
  run: async (client, message, args) => {
    message.delete();
    let texto = args.slice(1).join(" ");
    if(!texto) return message.channel.send("No has escrito ningun mensaje");
    message.channel.send(texto)


  },
};
