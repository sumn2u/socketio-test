/*jslint node: true */
'use strict';

const controller = require('../controllers/controller');

module.exports = function(app) {
  app.get('/', controller.hello);
};
