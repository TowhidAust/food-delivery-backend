const { body, validationResult } = require('express-validator');

module.exports = (app) => {
  const createUserController = require('./createUserController.js');
    app.route('/create-user' ).post(createUserController.createUser);
  }