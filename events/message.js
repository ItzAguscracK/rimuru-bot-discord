const mongoose = require('mongoose');
const GuildConfig = require('../models/GuildConfig');

module.exports = async (client, message) => {
    if (message.author.bot) return;

    const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id});
    const prefix = await guildConfig.get('prefix');

    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    
    if (!message.member) message.member = await message.guild.fetchMember (message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    
    if (command)
        command.run(client, message, args);
};