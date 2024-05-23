const axios = require('axios');
const crypto = require('crypto'); 
const https = require('https');

// LOGIN - Configurando para acessar a conta
const url = "https://h-api-integra.fde.sp.gov.br/acesso/login";

const user = "23.655.332/0001-00";

const pass = "primeiro@cesso@pi|ntegr@";



// Cria um custom agent com configurações menos restritivas
const agent = new https.Agent({
    rejectUnauthorized: false, // Desabilita a verificação de certificado
    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
  });



// Criação da função com rota para login com os parâmetros nome de usuário e senha
const login = async () => {

    // Requisição bem sucedida
    try {
        const response = await axios.post(url, {
            usuario: user,
            senha: pass
        }, { httpsAgent: agent });

        console.log('Status:', response.status);
        console.log('Nome de Usuário:', response.data.usuario);
        console.log('Token:', response.data.token);

    } catch(error){

        // Requisição feita e respondida com erro
        if(error.response) {
            console.log("Status do erro:", error.response.status);
            console.log("Mensagem do erro:", error.response.data.message);
            console.log("Detalhes do erro:", error.response.data.details);
        } 
        // Requisição feita porém sem resposta
        else if(error.request) {
            console.log("Nenhuma resposta recebida:", error.request);
        }
        else {
            // Requisição configurada com problemas 
            console.log("Erro:", error.message);
        }
    }
};

// Chamando a função login
login();
