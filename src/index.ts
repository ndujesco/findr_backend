import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

import app from './app';
import { Application } from 'express';

const MONGO_URI = process.env.MONGO_URI;

class Server {
  private port = process.env.PORT || 8000;
  private app;
  constructor(app: Application) {
    this.app = app;
  }

  async start() {
    await mongoose.connect(MONGO_URI);
    this.app.listen(this.port, () => {
      console.log(`Listening on url http://localhost:${this.port}/api`);
    });
  }
}
const server = new Server(app);
server.start();
