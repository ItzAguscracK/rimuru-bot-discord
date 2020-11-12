const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "addrole",
  category: "moderacion",
  description: "Añadir rol a un usuario.",
  usage: `addRole <usuarioMencion>`,
  run: async (client, message, args) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
    let owner = message.guild.owner.user.id;

    if(message.author == owner){
      if(!args[0]) return message.channel.send("Debes mencionar a un usuario.").then((m) => m.delete({ timeout: 5000 }));
      if(!user) return message.channel.send("Debes mencionar a un usuario valido").then((m) => m.delete({ timeout: 5000 }));

      if(!args[1]) return message.channel.send("Debes mencionar un rol").then((m) => m.delete({ timeout: 5000 }));
      if(!role) return message.channel.send("Debes mencionar un rol valido").then((m) => m.delete({ timeout: 5000 }));

      if(!role.editable) return message.channel.send("El rol mencionado esta en una jerarquia mas alta").then((m) => m.delete({ timeout: 5000 }));
      if (user.roles.cache.has(role.id)) return message.channel.send("El usuario ya tiene el rol mencionado").then((m) => m.delete({ timeout: 5000 }));

      await user.roles.add(role.id)
      return message.channel.send(`El rol ${role.name} ha sido agregado a el usuario ${user}`).then((m) => m.delete({ timeout: 10000 }));
    }

    if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRADOR")) return message.channel.send("No tienes permisos para utilizar este comando, permiso faltante: `MANAGUE_ROLES`").then((m) => m.delete({ timeout: 5000 }));
    if(!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRADOR")) return message.channel.send("Necesito permisos para utlizar este comando, permiso faltante: `MANAGUE_ROLES`").then((m) => m.delete({ timeout: 5000 }));
    

    if (!args[0]) return message.channel.send("Debes mencionar a un usuario.").then((m) => m.delete({ timeout: 5000 }));
    if (!user) return message.channel.send("Debes mencionar a un usuario válido.").then((m) => m.delete({ timeout: 5000 }));
    if (user == owner) return message.channel.send("No puedes añadir roles a ese usuario").then((m) => m.delete({ timeout: 5000 })); 
    
    if (user == message.author.id) {

        if (!args[1]) return message.channel.send("Debes mencionar un rol.").then((m) => m.delete({ timeout: 5000 }));
        if (!role) return message.channel.send("Debes mencionar un rol válido").then((m) => m.delete({ timeout: 5000 }));
        if (role.comparePositionTo(message.member.roles.highest) >= 0) return message.channel.send("No puedes añadir un rol igual o superior al tuyo.").then((m) => m.delete({ timeout: 5000 }));
    
        if (!role.editable) return message.channel.send("El rol mencionado esta en una jerarquia mas alta").then((m) => m.delete({ timeout: 5000 }));
        if (user.roles.cache.has(role.id)) return message.channel.send("Ya tienes este rol").then((m) => m.delete({ timeout: 5000 }));

        await user.roles.add(role.id)
        return message.channel.send(`**${user}** se le ha añadido el rol: ${role}`).then((m) => m.delete({ timeout: 10000 }));

    }


    if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0)  return message.channel.send("No puedes añadir roles a ese usuario, puede que tenga un rol igual o superior al tuyo.").then((m) => m.delete({ timeout: 5000 }));
    
    
    if (!args[1]) return message.channel.send("Debes mencionar un rol.").then((m) => m.delete({ timeout: 5000 }));
    if (!role) return message.channel.send("Debes mencionar un rol válido").then((m) => m.delete({ timeout: 5000 })); 
    if (role.comparePositionTo(message.member.roles.highest) >= 0) return message.channel.send("No puedes añadir un rol igual o superior al tuyo.").then((m) => m.delete({ timeout: 5000 }));
    
    
    if (!role.editable) return message.channel.send("El rol mencionado esta en una jerarquia mas alta").then((m) => m.delete({ timeout: 5000 })); 
    if (user.roles.cache.has(role.id)) return message.channel.send("Ese usuario ya cuenta con ese rol").then((m) => m.delete({ timeout: 5000 }));
    
    await user.roles.add(role.id)
    return message.channel.send(`El rol **${role.name}** ha sido agregado correctamente al usuario **${member.displayName}** | Dado por: **${message.member.displayName}**`).then((m) => m.delete({ timeout: 10000 }));

  },
};
