import express, { Application } from 'express';
import routes from './routes';

class App {
  public server: Application;

  constructor () {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  private routes() {
    this.server.use(routes);
  }
}

export default new App().server;