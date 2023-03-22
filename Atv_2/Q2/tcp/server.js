const net = require('net');

const server = net.createServer((socket) => {
    server.listen(3000, () => {
        console.log('Doideira na porta 3000')
    });

    console.log("Cliente online!");
    
    socket.on('data', (data) => {
        const params = data.toSring().trim().split(' ');
        const num1 = parseint(params[0]);
        const num2 = parseint(params[1]);
        const op = params[2];

        let result;
        
        switch(op){
        
            case '+':
                result = num1 + num2;
                break;
            
            case '-':
                result = num1 - num2;
                break;

            case '*':
                result = num1 * num2;
                break;
            
            case '/':
                result = num1 / num2;
                break;

            default:
                result = 'Operação invalida!!!';  
                    
        };

        socket.write(result.toString());
    });

    socket.on('end', () => {
        console.log('Cliente ofline!');
        }); 
    
});