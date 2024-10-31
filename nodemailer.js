// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();
const nodemailer = require('nodemailer');

// Criação do transportador de e-mail com base nas variáveis de ambiente
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Função para enviar o e-mail
async function sendEmail(episodios) {
  try {
    // Formatação da lista de episódios como string
    const listaEpisodios = episodios.map(ep => `- ${ep.nomeEpisodio}`).join('\n');
    const info = await transporter.sendMail({
      from: `"App WebScraping" <${process.env.EMAIL_USER}>`,
      to: 'vitorbarbosamarins@gmail.com',
      subject: 'Lista de Episódios de My Hero Academia',
      text: `Aqui está a lista de episódios de My Hero Academia:\n\n${listaEpisodios}`, 
    });

    console.log('E-mail enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

module.exports = sendEmail;