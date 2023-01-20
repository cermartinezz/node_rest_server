require('dotenv').config();

const Server = require('./bootstrap/server');


const server = new Server();

server.listen();


