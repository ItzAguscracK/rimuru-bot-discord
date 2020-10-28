module.exports = {
  name: "typeracer",
  category: "diversion",
  description: "El mas rapido en escribir.",
  usage: `typeracer`,
  run: async (client, message, args, awaitMessages) => {
    let humanize = require('humanize-duration');
    let palabras = ['soy el mas rapido', 'rimuru tempest', 'verdora tempest'];
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    let filtro = m => m.content === palabra;

    message.channel.send(`Bien, Escriban la palabra \`${palabra}\` en el menor tiempo posible!`);

    message.channel.awaitMessages(filtro, {max: 1, time: 60000, errors: ["time"]}).then(msg => {
      message.channel.send(`Gano ${msg.first().author} en ${humanize(Date.now() - message.createdTimestamp, {language: 'es'})}`)
    }).catch(() => { 
    message.channel.send(`Ninguno lo logro...`)
    })
  },
};
