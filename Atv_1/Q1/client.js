const net = require('net')
const readline = require('readline')

const client = new net.Socket()
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '127.0.0.1', () => {
    console.log('loguei')

    read.addListener('line', line=>{
        client.write(line)
        if (line === 'end'){
            client.end()
        }        
    })

    client.on('end', () => {
        process.exit()
    })


    client.on('data', data => {
        console.log(data.toString()) 
    })
})