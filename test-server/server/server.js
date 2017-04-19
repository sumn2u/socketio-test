/*jslint node: true */
'use strict';

const morgan = require('morgan'),
      bodyParser = require('body-parser'),
      path = require('path');

const socketConfig = require('./socket/socket.config');

module.exports = function(app, express, io) {

  const router = express.Router();

  if(process.env.NODE_ENV === 'dev'){
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  socketConfig(io);

  app.use(bodyParser.json());

  // app.use(express.static(path.join(__dirname, '../client')));

  app.use('/api', router);

  require('./routes/router')(router);
};
