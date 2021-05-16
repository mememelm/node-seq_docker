require("dotenv").config()

const connection = {
    HOST: process.env.DB_WRITE_HOST || "localhost",
    USER: process.env.DB_USERNAME || "mysql",
    PASSWORD: process.env.DB_PASSWORD || "melmanfils",
    DB: process.env.DB_DATABASE || "socle",
    dialect: process.env.DATABASE_TYPE || "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
}

module.exports = { connection }
