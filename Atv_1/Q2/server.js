const net = require('net')
const readline = require('readline')
let sockets = [] 

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function broadcast(msg, socketSent) {

    if (msg === 'end') {
        const index = sockets.indexOf(socketSent);
        sockets.splice(index, 1);
        socketSent.end()
    } 
    
    else {
        sockets.forEach(socket => {
            if (socket !== socketSent) socket.write(msg);
        });
    }
}

const connectionHandler = socket => {

    sockets.push(socket)

    socket.on('error', () => {
        console.log ('morreram aqui')
    })

    socket.on('data', data => { 
        broadcast(data.toString(), socket)
    })
} 

const server = net.createServer(connectionHandler)
server.listen(4000, '127.0.0.1')


