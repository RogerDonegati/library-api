import { Sequelize } from 'sequelize';

require('dotenv').config();

const configs: any = {
    development: {
        database: process.env.DEV_DB_NAME,
        username: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASS,
        options: {
            dialect: 'mysql',
            host: process.env.DEV_DB_HOST,
            port: +process.env.DEV_DB_PORT!,
            timezone: '-03:00',
        },
    },
    test: {
        database: 'database_test',
        username: 'root',
        password: null,
        options: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: '3306',
        },
    },
    production: {
        database: process.env.PROD_DB_NAME,
        username: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PASS,
        options: {
            dialect: 'mysql',
            host: process.env.PROD_DB_HOST,
            port: +process.env.PROD_DB_PORT!,
            timezone: 'America/Sao_Paulo',
            logging: false,
        },
    },
};
const config = configs[process.env.STAGE!];

export default new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options,
);
