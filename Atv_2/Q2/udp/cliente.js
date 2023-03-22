const dgram = require('dgram');

const client = dgram.createSocket('udp4');

const op = process.argv[2];
const num1 = process.argv[3];
const num2 = process.argv[4];

const message = `${op},${num1},${num2}`;
client.send(message, 8000, 'localhost', (err) => {
  if (err) {
    console.log(`Erro ao enviar a solicitação: ${err}`);
  }
});


client.on('message', (msg) => {
  console.log(`Resultado: ${msg.toString()}`);
  client.close();
});
