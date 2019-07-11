const dotenv = require('dotenv');
dotenv.load();

const config = require('config');
const http = require('http');

const app = require('./app');


app.on('error', (err) => {
  console.error('Server error', err);
});

http.createServer(app.callback()).listen(config.get('port'));
