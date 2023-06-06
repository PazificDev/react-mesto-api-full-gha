require('dotenv').config();

const {
  NODE_ENV = 'dev',
  JWT_SECRET,
  PORT = 3000,
  DB_URI = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

const secretKey = NODE_ENV === 'production' ? JWT_SECRET : '8ec676b235957e7aec559dfe8e8513bc9b73ff0d5e03ee4865ebfea5f0b93c52';

module.exports = {
  PORT,
  DB_URI,
  secretKey,
};
