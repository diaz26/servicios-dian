export const config = {
    appConfig: {
        port: process.env.APP_PORT
    },
    dbConfig: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        DBname: process.env.DB_NAME
    }
}
