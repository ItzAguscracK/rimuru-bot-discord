module.exports = {
  name: "say",
  category: "interaccion",
  description: "Comando decir.",
  usage: `say <mensaje>`,
  run: async (client, message, args) => {
    message.delete();
    let texto = args.join(' ')
    if(!texto) return message.channel.send("No has escrito ningun mensaje").then((m) => m.delete({ timeout: 5000 }));
    message.channel.send(texto)
  },
};
