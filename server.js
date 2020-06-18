const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()

const Sentry = require('@sentry/node')

const passport = require('passport')
const bodyParser = require('body-parser')

Sentry.init({
  dsn: process.env.DSN,
})

app.use(Sentry.Handlers.requestHandler())
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(Sentry.Handlers.errorHandler())
app.use(helmet())

const allowedOrigins = ['http://localhost:8100', 'https://demo.ooly.fr', 'https://jury.ooly.fr']
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
  }),
)

// Optional fallthrough error handler
/* istanbul ignore next */
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  /* istanbul ignore next */
  res.statusCode = 500
  /* istanbul ignore next */
  res.end(res.sentry + '\n')
})

// Authentication strategies
require('./strategies/login')
require('./strategies/register')
require('./strategies/jwt')

require('./routes/base')(app)
require('./routes/auth')(app)
require('./routes/user')(app)
require('./routes/oo')(app)
require('./routes/feedback')(app)
require('./routes/scenario')(app)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  /* istanbul ignore next */
  done(null, user)
})

app.use('/docs', express.static('documentation'))

const server = app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = {
  app,
  server,
}
