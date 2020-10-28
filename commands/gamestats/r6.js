const R6Api = require('r6-discord')
const R6 = new R6Api();
module.exports = {
  name: "r6",
  category: "gamestats",
  description: "Obten la latencia del BOT y la API en milisegundos.",
  usage: `ping`,
  run: async (client, message, args) => {

const username = args[0]
const plattform = args[1]

R6.stats(username, plattform).then(response => {
    console.log(response);
}).catch(error =>{
    console.log(error);
})


  
  },
};
