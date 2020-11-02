const puppeteer = require('puppeteer')
module.exports = {
  name: "screenshot",
  aliases: ['ss'],
  category: "interaccion",
  description: "Haz una screenshot a una página web.",
  usage: `screenshot <webSite>`,
  run: async (client, message, args) => {


    let web = args.join (" ") //Obtenemos los argumentos de el comando (link)
    if (!web) return message.channel.send('**Please put te link of the website**');
    //Si web no existe mandara un error diciendo que no existe
  

   
   const browser = await puppeteer.launch({defaultViewport: {width: 1920, height: 1080}, 
   args: ['--no-sandbox', '--disable-setuid-sandbox']});
   
   //Definimos browser para que corra la web en un pestaÃ±a 1920x1080
   
   const page = await browser.newPage(); //AbrirÃ¡ una pagina nueva en el browser
   await page.goto(web); //Va a ir a la web que hemos puesto en los args
   await page.screenshot({path: 'foto.png'}); 
   //TomarÃ¡ Screenshot y guardarÃ¡ foto en /example.png
   await browser.close(); //Cerramos el browser
   message.channel.send(``, { files: ["foto.png"] }).catch(error =>  
   
   //Enviamos la foto al canal y si hay error lo enviarÃ¡ al canal igual
   
   message.channel.send(error));
  },
};
