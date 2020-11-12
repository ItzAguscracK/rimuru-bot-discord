module.exports = {
  name: "verify",
  category: "interaccion",
  description: "Verificacion en servidor oficial de Rimuru.",
  usage: `verify`,
  run: async (client, message, args) => {
    message.delete();

    if (message.channel.id !== "776532020087226369") return;

    let carac =
      "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm,.-$%&!?";

    let cara = carac.charAt(Math.floor(Math.random() * carac.length));

    let clave = `${cara}${cara}${cara}${cara}${cara}${cara}${cara}${cara}${cara}${cara}${cara}${cara}`;

    let frases = [
      "🌊 ¡Me gusta el ritmo de las olas!",
      "🍎 ¿Tienes una manzana para mí?",
      "🌤️ Hace un hermoso día afuera.",
    ];

    let frase = frases[Math.floor(frases.length * Math.random())];

    message.author
      .send(
        `${frase} Tu clave de verificación en ${message.guild.name} es \`${clave}\``
      )
      .catch(() => {
        message.channel
          .send(
            "¡Al parecer no te puedo enviar mensajes al privado! Asegúrate de tener los MDs activados."
          )
          .then((x) => {
            x.delete(60000);
          });
      })
      .then(() => {

        message.channel
          .send(
            "Te envié tu clave de verificación al privado. Tienes 10 minutos y 3 intentos para escribir tu clave acá o expirara."
          )
          .then((x123) => {
            message.channel
              .awaitMessages((m1) => m1.author.id == message.author.id, {
                max: 3,
                time: 600000,
                errors: ["time"],
              })
              .catch(() => {
             
                message.channel
                  .send(
                    "¡Has tardado mucho en responder o agotaste tus intentos! Genera otro código e inténtalo de nuevo"
                  )
                  .then((x) => {
                    x.delete(60000);
                  });
              })
              .then((collected) => {
                if (collected.first().content == clave) {
                  message.channel.send("Verificado exitosamente");
                  message.member.roles.add("753759760137977866");
                  collected.first().delete(60000);
                  x123.delete(60000);
                  message.delete(60000);
                } else {
                    message.channel
                    .send("No es tu clave, escribe la correcta.")
                    .then((x) => {
                      collected.first().delete(60000);
                      message.delete(60000);
                    });
                }
              });
          });
      });
  },
};
