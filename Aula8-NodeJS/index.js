//import { createServer } from 'node:http';
var http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200 ;
  res.setHead( 'Content-Type', 'text/plain' );
  res.end('Oi galerinha\n');
});


server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
