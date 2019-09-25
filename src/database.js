import mongoose from 'mongoose';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
