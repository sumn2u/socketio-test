'use strict';
const express = require('express'),
      app = express(),
      http = require('http').Server(app),
      io = require('socket.io')(http);

// configure our server with all the middleware and and routing
require('./server/server.js')(app, express, io);

// export our app for testing and flexibility, required by index.js
const port = process.env.PORT || 3000;

//port on the server
http.listen(port, function(){
  console.log('Magic happens on ...' + port+' :)');
});

module.exports = app;
