export const dbConfig = {
    HOST: 'localhost',
    USER: 'karolkoz',
    PASSWORD: 'ZakonMySQL1',
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