const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  category: "moderacion",
  description: "ban an user.",
  usage: `ban <mencion || ID>`,
  run: async (client, message, args) => {
    let user = message.client.users.cache.get(args[1]) || message.mentions.users.first() || args[1];

    if (user) {
        var member = await message.guild.members.fetch(user).catch(err => { });

        if (member) {
            if (!member.bannable) return message.channel.send("I can't ban that user! Make sure I have the correct permission and that the person's role is not greater than mine.");
            if (args[2]) {
                member.ban({ reason: 'Ban command - ' + args.slice(2).join(" ") }).then(() => {
                    message.reply(`He baneado a ${user.tag} con la razon: ` + args.slice(2).join(" "));
                }).catch(err => {
                    message.reply("No puedo banear a este usuario.");
                    console.log(err);
                });
            } else {
                member.ban({ reason: 'Ban command' }).then(() => {
                    message.reply(`He baneado a ${user.tag}`);
                }).catch(err => {
                    message.reply("No puedo banear a este usuario.");
                    console.log(err);
                });
            }
        } else {
            message.reply("member not found. Mention someone or put their ID.");
        }
    } else {
        message.reply("Specify a server member to ban them!");
    }
  },
};
