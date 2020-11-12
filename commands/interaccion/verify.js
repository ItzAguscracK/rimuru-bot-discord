const { createCanvas, registerFont } = require('canvas')
const path = require("path");
module.exports = {
  name: "verify",
  category: "interaccion",
  description: "Verificacion en servidor oficial de Rimuru.",
  usage: `verify`,
  run: async (client, message, args) => {
    message.delete();

    if (message.channel.id !== "776532020087226369") return;

    const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split('')
    const font = path.join(__dirname, "../../assets/Roboto-Black.ttf")

    registerFont(font, { family: 'Captcha' })

    const canvas = createCanvas(125, 32)
    const ctx = canvas.getContext('2d')
    const text = this.randomText(4)

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.strokeStyle = '#0088cc'
    ctx.font = '26px Captcha';
    ctx.rotate(-0.05)
    ctx.strokeText(text, 15, 26)

    await message.author.send('Tienes 15 segundos para resolver el captcha', {
        files: [{ attachment: canvas.toBuffer(), name: 'captcha-quiz.png' }]
    })

    const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id,{
        max: 1,
        time: 15000
    })

    if (!msgs.size) return message.channel.send(`${message.author} Oops, el tiempo acabo era \`${text}\`.`)

    if (msgs.first().content !== text) return message.channel.send(`${message.author} Oops, disculpa era \`${text}\`.`)

    message.member.roles.add('753759760137977866');
    return message.channel.send(`${message.author} Perfecto, la respuesta si era \`${text}\`.`)
    


    function randomText(len) {
        const result = []
        for (let i = 0; i < len; i++)
        result.push(pool[Math.floor(Math.random() * pool.length)])
        return result.join('')
    }
  },
};
