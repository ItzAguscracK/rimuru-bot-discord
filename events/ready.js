  module.exports = client => {
    console.log('BOT iniciado, todo esta OK!');
    
    client.user.setPresence({
        status: "online",
        activity: {
            name: "a | "+client.guilds.cache.size +" Servidores",
            type: "LISTENING"
        }
    });
}