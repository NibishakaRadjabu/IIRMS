const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'iirms_ltd_restore_';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 3306);

if (!Number.isInteger(DB_PORT) || DB_PORT < 1 || DB_PORT > 65535) {
  throw new Error('DB_PORT must be a valid TCP port number.');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 60000,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const connectDB = async () => {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await sequelize.authenticate();
      console.log('MySQL connected');
      return;
    } catch (err) {
      const isLastAttempt = attempt === maxAttempts;
      console.error(`MySQL connection attempt ${attempt}/${maxAttempts} failed:`, err.message || err);

      if (isLastAttempt) {
        throw err;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
};

module.exports = { sequelize, connectDB };
