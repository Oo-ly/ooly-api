require('dotenv').config();

const express = require('express');
const app = express();

const passport = require('passport');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(passport.initialize());

// Authentication strategies
require('./strategies/login');
require('./strategies/register');
require('./strategies/jwt');

app.get('/', (req, res) => {
  res.json({ message: 'Hello World !' });
});

app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
