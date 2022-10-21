export const dbConfig = {
    HOST: 'lorebook-db.cqtsbw4id9qa.eu-central-1.rds.amazonaws.com',
    USER: 'admin',
    PASSWORD: 'MySQLAdmin1',
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