'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use(_express2.default.json());

app.get('/api/v1', (req, res) => res.status(200).send({
  status: 'connection successful',
  message: 'Welcome to Ireporter'
}));

// middlewares
app.use('/api/v1/red-flags', _index2.default);

app.get('*', (req, res) => res.status(404).send({ message: 'Page not found. Please visit /api/v1' }));
const port = 3000 || process.env.port;
app.listen(port, () => console.log(`app running on port ${port}`));

exports.default = app;