const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "ejecutar",
    run: async (client, message, args) => {
      message.delete();
      

      const embed = new MessageEmbed()
      .setTitle('Paquete Basico')
      .setColor('PURPLE')
      .setThumbnail(message.guild.iconURL())
      .setDescription('**Paquete de Creación de Servidores Basico**\n\n<:rojo:751190780781133896>Configuración del servidor al mínimo\n<:rojo:751190780781133896> Configuración de Roles y Permisos\n<:rojo:751190780781133896> Configuración minima de BOTS\n<:rojo:751190780781133896> Sistema de logs, bienvenidas y mas!!!\n\n<a:cd_a:728385657658933258> En este paquete, proporcionamos la configuración básica para su servidor. Proporcionaremos suficiente configuración para que su servidor sea estable. Obviamente, los bots en este paquete tienen la menor configuración en comparación con otros bots. Perfecto para iniciar proyectos')
      .addField('Precio', '`1$usd - 2$usd`', true)
      .addField('Metodos de Pago', '`PayPal - Uala - MercadoPago`', true)
      .addField('Atención ', '<@&771543820718047252>', true)
      .setFooter('❕ Si desea obtener otras características que el paquete no tiene, se agregarán costos adicionales, pero esto será determinado por el desarrollador que brinde el servicio.')

      return message.channel.send(embed)
    },
  };