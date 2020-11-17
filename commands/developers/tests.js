module.exports = {
  name: "tests",
  category: "developers",
  description: "Este es un comando de pruebas, wow!.",
  usage: `tests`,
  run: async (client, message, args) => {

    message.channel.send(':x: | Acceso denegado, unicamente desarrolladores!').then((m) => m.delete({ timeout: 5000 }));

  },
};
