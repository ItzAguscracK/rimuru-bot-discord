const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "badges",
  category: "info",
  description: "Obtenga todas las insignias de un usuario.",
  usage: `ping`,
  run: async (client, message, args) => {

    const users = message.mentions.users.first() || message.author  

    const variables = {
        "DISCORD_EMPLOYEE": "<:Discordstaff:771913056593903627> Discord Staff",
        "DISCORD_PARTNER": "<:Partner:771908115331285002> Discord Partner",
        "BUGHUNTER_LEVEL_1": "<:BugHunter:771915736011767808> Bug Hunter Lvl1",
        "BUGHUNTER_LEVEL_2": "<:BugHunterYellow:771917878018572288> Bug Hunter Lvl2",
        "HOUSE_BRAVERY": "<:BraveryBadge:771913504156024884> Bravery del HypeSquad",
        "HOUSE_BRILLIANCE": "<:Brilliance:771914114603417631> Brilliance del HypeSquad",
        "HOUSE_BALANCE": "<:Balance:771914900104544267> Balance del HypeSquad",
        "EARLY_SUPPORTER": "<:EarlySupporter:771918237201858580> Early Supporter",
        "VERIFIED_BOT": "<:VerifiedBot:771919282250317875> Bot Verificado",
        "VERIFIED_DEVELOPER": "<:BotDeveloper:771916349801889832> Desarrollador inicial de bots verificados"
    }

    console.log(users.flags.toArray().length);
   
    //if(users.flags.toArray().length === '0') return message.channel.send('No tienes flags')
    const embed = new MessageEmbed()
    .setDescription(users.flags.toArray().map(f=>variables[f]) ? users.flags.toArray().map(f=>variables[f]) : 'No tiene flags')
    return message.channel.send(embed)
  

  },
};
