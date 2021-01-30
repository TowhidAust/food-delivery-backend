
const { database } = require('../../firebase');
const _ = require('lodash');
var jwt = require('jsonwebtoken');


exports.getMenus = (req, res) => {
    jwt.verify(req.token, 'my-secret-key', function (err, data) {
        if (err) {
            res.json(err);
            return false;
        } else {
            database.ref('/food-delivery-app/menu').once("value").then(snapshot => {
                let menus = snapshot.val();
                res.json(menus);
                return false;
            })
        }
    })
}