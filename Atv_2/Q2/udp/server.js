const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  const data = msg.toString();

  const [op, num1, num2] = data.split(',');

  const n1 = parseInt(num1);
  const n2 = parseInt(num2);

  let result;
  switch (op) {
    case 'add':
      result = n1 + n2;
      break;
    case 'sub':
      result = n1 - n2;
      break;
    case 'mul':
      result = n1 * n2;
      break;
    case 'div':
      result = n1 / n2;
      break;
    default:
      result = 'Operação inválida';
  }

  server.send(result.toString(), rinfo.port, rinfo.address, (err) => {
    if (err) {
      console.log(`Erro ao enviar a resposta: ${err}`);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor calculadora UDP está ouvindo em ${address.address}:${address.port}`);
});

server.bind(8000);
