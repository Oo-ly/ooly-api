const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
})

const express = require('express')
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

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
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
  done(null, user)
})

app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!')
})

app.use('/docs', express.static('documentation'))

const server = app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = {
  app,
  server,
}
