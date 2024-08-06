require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'localdev',
    database: process.env.DB_DATABASE || 'backenddb',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
  },
};
