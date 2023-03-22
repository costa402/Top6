const dgram = require('dgram');
const readline = require('readline');

const server = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const clients = new Map();

server.on('message', (msg, rinfo) => {
  const data = msg.toString();

  if (!clients.has(rinfo.address)) {
    clients.set(rinfo.address, rinfo.port);
    console.log(`Novo cliente conectado: ${rinfo.address}:${rinfo.port}`);
  }

  for (const [addr, port] of clients.entries()) {
    if (addr !== rinfo.address || port !== rinfo.port) {
      server.send(`${rinfo.address}:${rinfo.port}: ${data}`, port, addr, (err) => {
        if (err) {
          console.log(`Erro ao enviar a mensagem: ${err}`);
        }
      });
    }
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor de chat UDP está ouvindo em ${address.address}:${address.port}`);
});

server.bind(8000);

rl.on('line', (input) => {
  for (const [addr, port] of clients.entries()) {
    server.send(`SERVIDOR: ${input}`, port, addr, (err) => {
      if (err) {
        console.log(`Erro ao enviar a mensagem: ${err}`);
      }
    });
  }
});