module.exports = {
    name: "verify",
    run: async (client, message, args) => {
        message.delete()
        message.member.roles.add('753759760137977866')
        return message.author.send("✅ | Te has verificado correctamente");
    },
  };
  