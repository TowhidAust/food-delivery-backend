module.exports = (app) => {
    const getMenusController = require('./menusController');
    const middlewares = require('../Middlewares/middleware');
    app.route('/get-menu-items').get(middlewares.ensureToken, getMenusController.getMenus);
}