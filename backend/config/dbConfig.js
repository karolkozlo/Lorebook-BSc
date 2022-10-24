export const dbConfig = {
    production: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
    },
    development: {
        HOST: 'localhost',
        USER: 'karolkoz',
        PASSWORD: 'ZakonMySQL1',
    },
    DB: 'Lorebook',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    }
};