module.exports = (app) => {
    const editUserController = require('./editUserController.js');
    const middlewares = require('../Middlewares/middleware');

    app.route('/edit-user-name').post(middlewares.ensureToken, editUserController.editUserName);
    app.route('/edit-user-email').post(middlewares.ensureToken, editUserController.editUserEmail);
    app.route('/edit-user-address').post(middlewares.ensureToken, editUserController.editUserAddress);
}