const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
module.exports = {
    name: 'commands',
    aliases: ['comandos', 'c'],
    category: 'interaccion',
    description: 'Mustra una lista completa de los comandos del bot.',
    usage: `commands`,
    run: async (client, message) => {
        message.channel.send(':white_check_mark: | Has recibido la informacion de los comandos en tus mensajes privados.').then((m) => m.delete({ timeout: 5000 }));
        return getAll(client, message);
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
    .setColor(process.env.COLOR)
    .setTitle('Lista de comandos')
    .setThumbnail(client.user.avatarURL())
    
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => ` \`${cmd.name}\``)
            .join(', ');
    }

    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => `${string}\ \n\n${category}`);

    return message.author.send(embed.setDescription('Usa `' + (`${process.env.PREFIX}help <nombreDelComando>\` sin \`<>\` para ver mas informacion de un comando especifico.\n\n${info}`)));
}