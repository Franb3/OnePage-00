// * Importación de librerias necesarias
import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import cors from "cors";

// * Creación de la aplicación Express
const app = express();
const PORT = 5000;

// * Middlewares
app.use(bodyParser.json()); // ! Permite que Express analice solicitudes con cuerpo en formato JSON
app.use(cors()); // ! Habilita CORS para permitir solicitudes de otros dominios

// * Configuración de Nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// * Ruta POST para manejar el envío de correos electrónicos
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body; // ! Desestructuración de los datos recibidos en el cuerpo de la solicitud

  // * Opciones para configurar el correo a enviar
  const mailOptions = {
    from: email,
    to: "franbdeveloper@gmail.com",
    subject: `Nuevo mensaje de ${name}`,
    text: message,
  };

  // * Enviar el correo utilizando Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // ! Si hay un error al enviar el correo
      console.error("Error al enviar el correo:", error); // ! Loguear el error en la consola
      return res.status(500).send("Error al enviar el correo."); // ! Responder con un error 500 al cliente
    }
    console.log("Correo enviado:", info.response);
    res.status(200).send("Correo enviado correctamente.");
  });
});

// * Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
