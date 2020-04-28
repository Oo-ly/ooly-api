const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
})

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'mariadb',
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST,
    dialect: 'mariadb',
  },
}
