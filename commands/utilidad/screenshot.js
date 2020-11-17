const puppeteer = require("puppeteer");
module.exports = {
  name: "screenshot",
  aliases: ["ss"],
  category: "utilidad",
  description: "Haz una screenshot a una página web.",
  usage: `screenshot <webSite>`,
  run: async (client, message, args) => {
    let web = args.join(" ");
    if (!web)
      return message.channel
        .send("**Debes ingresar una pagina web.**")
        .then((m) => m.delete({ timeout: 5000 }));

    try {
      message.channel.startTyping();
      const browser = await puppeteer.launch({
        defaultViewport: { width: 1920, height: 1080 },
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });

      const page = await browser.newPage();
      await page.goto(web);

      let pageFoto = await page.screenshot({ type: "png" });

      await browser.close();
      message.channel.stopTyping();
      await message.channel
        .send(``, { files: [{ attachment: pageFoto, name: "foto.png" }] })
        .catch((error) => message.channel.send(error.toString()));
    } catch (error) {
      message.channel.stopTyping();
      await message.channel.send(error.toString());
      console.log(error);
    }
  },
};
