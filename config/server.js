const express = require('express');
const cors = require('cors');
const { connection } = require('../database/config');

class Server {
  constructor () {
    this.app = express();
    this.port = process.env.PORT
    this.auth_routes = '/api/auth';
    this.user_routes = '/api/users';

    this.databaseConnect();

    // Middlewares
    this.middleware();


    // Routes
    this.routes();
  }

  async databaseConnect() {
    await connection()
  }

  middleware(){
    this.app.use(cors());
    this.app.use(express.static('public'))
    this.app.use(express.json());
  }

  routes () {
    this.app.use(this.auth_routes, require('../routes/auth'))
    this.app.use(this.user_routes, require('../routes/users'))
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    })
  }
}


module.exports = Server;