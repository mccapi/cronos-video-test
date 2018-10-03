const serviceLocator = require('../libs/service-locator');

const logger = serviceLocator.get('logger');

class Database {
  constructor() {
    this.mongoose = serviceLocator.get('mongoose');
  }

  async connect(port, host, name) {
    try {
      this.mongoose.Promise = global.Promise;
      this.mongoose.connect(`mongodb://${host}:${port}/${name}`, { useNewUrlParser: true });
      const { connection } = this.mongoose;
      connection.on('connected', () => logger.info('Database Connection was Successful'));
      connection.on('error', err => logger.info(`Database Connection Failed ${err}`));
      connection.on('disconnected', () => logger.info('Database Connection Disconnected'));
      process.on('SIGINT', () => {
        connection.close();
        logger.info('Database Connection closed due to NodeJs process termination');
        process.exit(0);
      });
    } catch (e) {
      logger.error(e);
    }
  }
}

module.exports = Database;
