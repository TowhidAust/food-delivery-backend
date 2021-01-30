
const { database } = require('../../firebase');
const _ = require('lodash');
var jwt = require('jsonwebtoken');


/**
 * 
 */
exports.getMenus = (req, res) => {
    jwt.verify(req.token, 'my-secret-key', function (err, data) {
        if (err) {
            res.json(err);
            return false;
        } else {
            let menu = {
                "kacchiVai": {
                    "restaurantid": 1,
                    "drinks": [
                        {"coke": "20"},
                        {"pepsi": "20"},
                        {"water": "20"}
                    ],

                    "junk-food": [
                        {"hamburger": "40"},
                        {"fries": "20"},
                        {"pizza": "20"}
                    ]
                }
                
            }
            
            database.ref()
        }
    })
    
}