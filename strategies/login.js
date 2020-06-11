const bcrypt = require('bcrypt')
const User = require('../schemas/User')

const passport = require('passport'),
  LocalStrategy = require('passport-local')

passport.use(
  'loginUser',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordFiel: 'password',
      session: false,
    },
    (username, password, done) => {
      // We try to find an user with this username
      User.scope(null)
        .findOne({
          attributes: ['uuid', 'username', 'password'],
          where: { username },
        })
        .then(user => {
          if (!user) {
            // If no user is found, we return an error
            return done(null, false, { message: 'Username not found' })
          } else {
            // If an user with this username is found, we compare the password sent to the one stored in database
            const saltPassword = password + process.env.SECRET_SALT
            bcrypt.compare(saltPassword, user.password).then(response => {
              if (!response) {
                return done(null, false, { message: 'Incorrect password' })
              }
              return done(null, user)
            })
          }
        })
      // .catch(err => {
      //   done(err, false)
      // })
    },
  ),
)
