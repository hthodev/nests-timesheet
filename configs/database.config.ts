export default () => ({
  database: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'localdev',
    database: process.env.DB_DATABASE || 'backenddb',
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERTIFICATE,
    },
  },
});