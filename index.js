const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose');
const client = new Client({ ws: { properties: { $browser: "Discord Android" }}})
const db   = 'mongodb+srv://db_user:99wanterronyes@cluster-db-discord.mbqup.gcp.mongodb.net/RimuruProject?' ||process.env.MONGODB_URI;

client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map()

client.categories = fs.readdirSync('./commands/');

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true)
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected`);
  })
.catch(err => console.error(`Connection error ${err}`));

config({
    path: `${__dirname}/.env`
});

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        console.log(`Eventos cargados '${evtName}'`);
        client.on(evtName, evt.bind(null, client));
    });
});

client.login(process.env.TOKEN);