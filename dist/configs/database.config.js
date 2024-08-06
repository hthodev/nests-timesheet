"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        username: process.env.DB_USERNAME || 'dev',
        password: process.env.DB_PASSWORD || 'localdev',
        database: process.env.DB_DATABASE || 'backenddb',
    },
});
//# sourceMappingURL=database.config.js.map