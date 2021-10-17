const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.route'));
app.use('/user', require('./routes/user.route'));
app.use('/publication', require('./routes/publication.route'));

// Port assignment
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Catch 404
app.use((_req, res, _next) => {
  res.status(404).send({
    code: 404,
    data: 'Page not found',
  });
});

module.exports = {
  app,
  server,
};
