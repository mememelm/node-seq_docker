const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const config = require('./bin/config')

const { errorParsor } = require('./midlleware/error-parser')
const { pathLogger } = require('./midlleware/path-logger')

const app = express()
const db = require('./model')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// type data REST
app.use(logger('dev'))
app.use(express.json({ type: 'application/json' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', '*')
  next()
})

// cors & options
var corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions))

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// paht logger => party debug
if (config.debug) {
  app.use(pathLogger)
}

// route global
const routes = require('./routes')
app.use('/', routes)

// middleware errorParser
app.use(errorParsor)

// =========================== START Server ===============================
app.listen(config.port, () => {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
})

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Sequelize traitement successfull')
})

module.exports = app
