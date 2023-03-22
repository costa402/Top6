const dgram = require('dgram');
const readline = require('readline');

const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const serverPort = 8000;
