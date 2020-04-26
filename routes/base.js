const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World !' });
  });

  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'Server is running' });
  });
};
