module.exports = (app) => {
    const getMenusController = require('./menusController');
    const middlewares = require('../Middlewares/middleware');
    app.route('/get-menu-items').post(middlewares.ensureToken, getMenusController.getMenus);
}