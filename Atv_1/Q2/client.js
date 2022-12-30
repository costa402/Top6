const net = require('net')
const readline = require('readline')

const client = new net.Socket()
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const waitForUsername = new Promise(resolve => {
    read.question('Diga um nome de usuario: ', answer => {
        resolve(answer)
    });
})
    
waitForUsername.then(username => {

    client.connect(4000, '127.0.0.1', () => {

        client.on('connect', () => {
            client.write(username + ' entrou.');
        });
   
        read.on('line', data => {
            if (data === 'quit') {
                client.write(username + 'saiu.');
                client.setTimeout(1000);
            }
            else {
            client.write(username + ': ' + data);
            }
        });

        client.on('timeout', () => {
            client.write('quit');
        });

        client.on('end', () => {
            process.exit();
        });

        client.on('data', data => {
            console.log('\x1b[33m%s\x1b[0m', data.toString()) 
        })
    })
})