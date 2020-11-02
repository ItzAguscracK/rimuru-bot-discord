//Importaciones
const Discord = require("discord.js");
const os = require('os');
const cpuStat = require('cpu-stat');
const moment = require("moment");
require("moment-duration-format");
const { promisify } = require('util');
const p = promisify(cpuStat.usagePercent);

module.exports = {
  name: "stats",
  category: "info",
  description: "Estadisticas del BOT.",
  usage: `stats`,
  run: async (client, message, args) => {

    const actividad = moment
      .duration(client.uptime)
      .format(" D [dias], H [hrs], m [mins], s [secs]");


    const embedStats = new Discord.MessageEmbed()
    .setTitle('Estadisticas')
    //Memoria RAM
    .addField('• RAM', `${memory(os.totalmem() - os.freemem(), false)} / ${memory(os.totalmem())}` , true)
    //RAM Usage
    .addField('• RAM Usage', memory(process.memoryUsage().rss), true)
    //Tiempo Activo
    .addField('• Uptime', actividad, true)

    //Version Discord
    .addField('• Discord.js', `v${Discord.version}`, true)
    //Node Version
    .addField('• Node.js', `${process.version}`, true)
    //Host Service
    .addField('• Host', 'Localhost', true)

    //Sistema Operativo
    .addField('• OS', `\`\`\`md\n${os.version()}\n${os.release()}\`\`\``)

    //CPU
    .addField('• CPU', `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)

    //Uso de la CPU
    //.addField('CPU Usage', `\`${percent.toFixed(2)}%\``, true)
    //Arquitectura
    .addField('Arquitectura', `\`${os.arch()}\``, true)
    //PLataforma
    .addField('Plataforma', `\`\`${os.platform()}\`\``, true)

    .setColor("RANDOM")
    .setFooter('Rimuru Stats')

    return message.channel.send(embedStats)


    function memory(bytes = 0, r = true) {
        const gigaBytes = bytes / 1024 ** 3;
        if (gigaBytes > 1) {
          return `${gigaBytes.toFixed(1)} ${r ? "GB" : ""}`;
        }
      
        const megaBytes = bytes / 1024 ** 2;
        if (megaBytes > 1) {
          return `${megaBytes.toFixed(2)} ${r ? "MB" : ""}`;
        }
      
        const kiloBytes = bytes / 1024;
        if (kiloBytes > 1) {
          return `${kiloBytes.toFixed(2)} ${r ? "KB" : ""}`;
        }
      
        return `${bytes.toFixed(2)} ${r ? "B" : ""}`;
      }
  },
};

