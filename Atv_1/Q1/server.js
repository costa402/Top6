const net = require('net')
const readline = require('readline')

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const connectionHandler = socket => {
    console.log ('logaram aqui')

    read.addListener('line', line => {
        socket.write(line)
    })

    socket.on('end', () => {
        console.log ('desconectaram aqui')
    })

    socket.on('error', () => {
        console.log ('morreram aqui')
    })

    socket.on('data', data => {
        const msg = data.toString()
        if (msg === 'end') {
            socket.end()
        }
        else{
            console.log(data.toString()) 
        }
    })
} 

const server = net.createServer(connectionHandler)
server.listen(4000, '127.0.0.1')