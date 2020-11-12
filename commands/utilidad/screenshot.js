const puppeteer = require('puppeteer')
module.exports = {
  name: "screenshot",
  aliases: ['ss'],
  category: "utilidad",
  description: "Haz una screenshot a una página web.",
  usage: `screenshot <webSite>`,
  run: async (client, message, args) => {

    let web = args.join (" ")
    if (!web) return message.channel.send('**Debes ingresar una pagina web.**').then((m) => m.delete({ timeout: 5000 }));

   const browser = await puppeteer.launch({defaultViewport: {width: 1920, height: 1080}, 
   args: ['--no-sandbox', '--disable-setuid-sandbox']});
   
   const page = await browser.newPage(); 
   await page.goto(web); 
   await page.screenshot({path: 'foto.png'}); 

   await browser.close(); 
   message.channel.send(``, { files: ["foto.png"] }).catch(error =>  
   message.channel.send(error));
  },
};
