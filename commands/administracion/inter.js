const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "inter",
    run: async (client, message, args) => {
      message.delete();
      

      const embed = new MessageEmbed()
      .setTitle('Paquete Avanzado')
      .setColor('PURPLE')
      .setThumbnail(message.guild.iconURL())
      .setDescription('**Paquete de Creación de Servidores Avanzado**\n\n<:rojo:751190780781133896>En este paquete le ofrecemos la mejor configuracion posible!!!\n\n<a:cd_a:728385657658933258> En este paquete, le proporcionamos una configuracíon estable y segura para su servidor. Los bots en este paquete tienen la mejor configuración en comparación con el anterior. Perfecto para cualquier proyecto')
      .addField('Precio', '`2$usd - 4$usd`', true)
      .addField('Metodos de Pago', '`PayPal - Uala - MercadoPago`', true)
      .addField('Atención ', '<@&771543820718047252>', true)
      .setFooter('❕ Si desea obtener otras características que el paquete no tiene, se agregarán costos adicionales, pero esto será determinado por el desarrollador que brinde el servicio.')

      return message.channel.send(embed)
    },
  };