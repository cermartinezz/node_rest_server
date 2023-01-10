const express = require('express');
const cors = require('cors');
const { connection } = require('../database/config');

class Server {
  constructor () {
    this.app = express();
    this.port = process.env.PORT

    this.routes = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
    }

    this.databaseConnect();

    // Middlewares
    this.middleware();


    // Routes
    this.registerRoutes();
  }

  async databaseConnect() {
    await connection()
  }

  middleware(){
    this.app.use(cors());
    this.app.use(express.static('public'))
    this.app.use(express.json());
  }

  registerRoutes () {
    this.app.use(this.routes.auth, require('../routes/authRoutes'))
    this.app.use(this.routes.users, require('../routes/usersRoutes'))
    this.app.use(this.routes.categories, require('../routes/categoryRoutes'))
    this.app.use(this.routes.products, require('../routes/productRoutes'))
    this.app.use(this.routes.search, require('../routes/searchRoutes'))
  }

  listen(){
    this.app.listen(this.port, () => {
        console.log('Servidor corriendo en puerto', this.port);
    })
  }
}


module.exports = Server;