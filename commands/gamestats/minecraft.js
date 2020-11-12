const { MessageEmbed } = require("discord.js");
const mi = require('minecraft-information');
module.exports = {
  name: "minecraft",
  run: async (client, message, args) => {

    console.log('Comando MC usado');
    /* 
    const nameServer = args.join(' ');
    if(!nameServer) return message.channel.send('Debes escribir la IP de un servidor');

    //console.log(await mi.server(nameServer));
*/
  },
};
