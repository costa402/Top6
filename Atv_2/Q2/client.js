const net = require('net');

const client = new net.Socket();

client.connect(3000, 'localhost', () => {
    console.log('conexão estabelecida!');
    console.log('digite uma operacão no formato <numero> <numero> <operação>');

    process.stdin.on('data', (data) => {
        client.write(data.toString().trim());
    });
});

client.on('data', (data) => {
    console.log('Resultado: ' + data.toString());
});

client.on('close', () => {
    console.log('Conexão encerrada!');
});