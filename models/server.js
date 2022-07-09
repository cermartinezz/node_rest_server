const express = require('express');
const cors = require('cors');

class Server {
  constructor () {
    this.app = express();
    this.port = process.env.PORT
    this.user_routes = '/api/users';

    // Middlewares
    this.middleware();


    // Routes
    this.routes();
  }

  middleware(){
    this.app.use(cors());
    this.app.use(express.static('public'))
    this.app.use(express.json());
  }

  routes () {
    this.app.use(this.user_routes, require('../routes/users'))
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    })
  }
}


module.exports = Server;