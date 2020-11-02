const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "custom",
    run: async (client, message, args) => {
      message.delete();
      

      const embed = new MessageEmbed()
      .setTitle('Paquete Custom')
      .setColor('PURPLE')
      .setThumbnail(message.guild.iconURL())
      .setDescription('**Paquete de Creación de Servidores Custom**\n\n<a:cd_a:728385657658933258> Haga volar su imaginación con el paquete de creación de servidores customizable, en este paquete puede pedir lo que usted quiera, no hay limites, usted elije lo mejor para su servidor y por eso tenemos este paquete!!!\n**Lo mejor para grandes proyectos**')
      .addField('Precio', '`???`', true)
      .addField('Metodos de Pago', '`PayPal - Uala - MercadoPago`', true)
      .addField('Atención ', '<@&771543820718047252>', true)
      .setFooter('❕ El precio variara segun como lo requiera su servidor, si usted da un limite de precio nosotros nos adaptaremos con nuestros recursos a el, en cambio si quiere hacer volar su imaginacion, el desarrollador pondra el precio cuando el proyecto este listo.')

      return message.channel.send(embed)
    },
  };