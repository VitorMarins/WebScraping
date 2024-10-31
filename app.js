const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML
const sendEmail = require('./nodemailer');



const url = 'https://pt.wikipedia.org/wiki/Lista_de_epis%C3%B3dios_de_Boku_no_Hero_Academia';
const tabelaEpisodio = [];

async function fetchData() {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        const tabelaStatus = $('.vevent');
        const tabelaEpisodio = [];

        tabelaStatus.each(function () {
            const nomeEpisodio = $(this).find('.summary').text().trim();
            if (nomeEpisodio) {
                tabelaEpisodio.push({ nomeEpisodio });
            }
        });

        return tabelaEpisodio;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}


// Executa o codigo
async function main() {
    const episodios = await fetchData();
    if (episodios.length > 0) {
        sendEmail(episodios); // Envia a lista de episódios por e-mail
    } else {
        console.log('Nenhum episódio encontrado para enviar por e-mail.');
    }
}

main();
