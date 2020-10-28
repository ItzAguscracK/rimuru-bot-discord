const Canvas = require("canvas");
const welcome = require("../models/GuildConfig");
const messageModel = require("../models/imgConfig");
const path = require("path");
const Discord = require("discord.js");

module.exports = async (client, member) => {
  let can = await welcome.findOne({
    guildId: member.guild.id,
  });
  if (!can) return;

  let wcanal = member.guild.channels.cache.get(`${can.memberWelcomeChannel}`);

  if (!wcanal) return;

  const msgDocument = await messageModel.findOne({
    guildId: {
      $eq: member.guild.id,
    },
  });

  let cosas = path.join(__dirname, "/../assets/wallpaper.jpg");

  if (msgDocument) {
    cosas = Buffer.from(msgDocument.image, "base64");
  }

  //const att = new MessageAttachment(buf, "hola.png");

  const canvas = Canvas.createCanvas(800, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(cosas);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  //Titulo
  ctx.font = "40px Arial";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaselin = "hanging";
  ctx.fillText(`¡Bienvenido ${member.user.username}!`, canvas.width / 2, 75);
  ctx.fillText(`¡Ahora somos x usuarios!`, canvas.width / 2, 350);

  const y = 100,
    radio = 85,
    x = canvas.width / 2 - radio;
  //Borde del avatar
  ctx.beginPath();
  ctx.arc(x + radio, y + radio, radio + 5, 0, Math.PI * 2, true);
  ctx.fillStyle = "#101010";
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  //Circulo para cortar el avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + radio, y + radio, radio, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  //Avatar
  const imagen = await Canvas.loadImage(
    member.user.displayAvatarURL({ dynamic: false, size: 256, format: "png" })
  );
  ctx.drawImage(imagen, x, y, radio * 2, radio * 2);

  const attach = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "bienvenida.png"
  );

  wcanal.send(attach);
};
