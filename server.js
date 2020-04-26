require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World !' });
});

app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
