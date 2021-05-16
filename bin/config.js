require('dotenv').config()

config = {
    baseUrl: process.env.APP_ENDPOINT || 'http://localhost:3000/',
    env: process.env.NODE_ENV,
    debug: process.env.DEBUG ? process.env.DEBUG == 'true' : true,
    port: process.env.SERVER_PORT || 3000
}

module.exports = config