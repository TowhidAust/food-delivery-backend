module.exports = (app) => {
    const editUserController = require('./editUserController.js');
    app.route('/edit-user-name').post(editUserController.editUserName);
    app.route('/edit-user-email').post(editUserController.editUserEmail);
    app.route('/edit-user-address').post(editUserController.editUserAddress);
}