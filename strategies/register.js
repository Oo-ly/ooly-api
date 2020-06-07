const bcrypt = require('bcrypt')
const User = require('../schemas/User')
const { v4: uuidv4 } = require('uuid')

const passport = require('passport'),
  LocalStrategy = require('passport-local')

passport.use(
  'registerUser',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      User.findOne({
        where: { username },
        include: [],
      }).then(user => {
        if (user !== null) {
          return done(null, false, { message: 'Username is already taken' })
        } else {
          const saltPassword = password + process.env.SECRET_SALT
          bcrypt.hash(saltPassword, 12).then(hashedPassword => {
            User.create({
              uuid: uuidv4(),
              username,
              password: hashedPassword,
            }).then(user => {
              return done(null, user)
            })
          })
        }
      })
      // .catch(err => {
      //   return done(err, false)
      // })
    },
  ),
)
