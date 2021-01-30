module.exports = (app) => {
    const loginController = require('./loginController');
    app.route('/login').post(loginController.loginUser);
}