const https = require('https');
const express = require('express');
const fs = require('fs');

const app = express();

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

app.post('/proxy', (req, res) => {
  // Certificado e chave são lidos do sistema de arquivos
  const certificado = fs.readFileSync('G:/Meu Drive/0.Tecnologia/0.API/0.Itaú/KeysItau/Certificado_itau.crt');
  const chave = fs.readFileSync('G:/Meu Drive/0.Tecnologia/0.API/0.Itaú/KeysItau/NOVO_CERTIFICADO.key');

  // O hostname, corpo da solicitação e cabeçalhos são obtidos da solicitação do cliente
  const { host, path, body, headers, method } = req.body;

  const options = {
    hostname: host,
    port: 443,
    path: path,
    method: method,
    key: chave,
    cert: certificado,
    headers: headers,
  };

  const proxy = https.request(options, (response) => {
    response.pipe(res, {
      end: true,
    });
  });

  console.log(req.body);
  console.log(body);

  // Escreva o corpo da solicitação no fluxo de solicitação
  proxy.write(body);
  proxy.end();

  proxy.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
});

const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});