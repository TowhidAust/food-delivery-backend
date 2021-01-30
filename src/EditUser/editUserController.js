
const { database } = require('../../firebase');
const _ = require('lodash');
var jwt = require('jsonwebtoken');


/**
 * Edit user name.
 * req data body parameters should look like below
 * {"userID": "-MSENrLz3I7hVBJcLVD5","name": "newName"}
 * Header: "Authentication" => Bearer jwtToken
 */
exports.editUserName = (req, res) => {
    jwt.verify(req.token, 'my-secret-key', function (err, data) {
        if (err) {
            res.json(err);
            return false;
        } else {
            let givenUserID = _.get(req.body, ['userID'], undefined);
            let givenName = _.get(req.body, ['name'], undefined);

            if (givenUserID && givenName) {
                database.ref(`/food-delivery-app/users/${givenUserID}/publicInfo`).update({ name: givenName }).then(snapshot => {
                    res.send(`Your token is validated and Database updated with new name`);
                    return false;
                });
            } else {
                res.send(`Failed edit username. Please provide a valid userID and name in json format`);
                return false;
            }
        }
    })
    
}


/**
 * Edit user email.
 * req data body parameters should look like below
 * {"userID": "-MSENrLz3I7hVBJcLVD5","email": "test@gmail.com"}
 * Header: "Authentication" => Bearer jwtToken
 * 
 */
exports.editUserEmail = (req, res) => {
    jwt.verify(req.token, 'my-secret-key', function (err, data) { 
        if (err) {
            res.json(err);
            return false;
        } else {
            let givenUserID = _.get(req.body, ['userID'], undefined);
            let givenEmail = _.get(req.body, ['email'], undefined);

            if (givenUserID && givenEmail) {
                database.ref(`/food-delivery-app/users/${givenUserID}/publicInfo`).update({ email: givenEmail }).then(snapshot => {
                    res.send(`jwt token varified and Database updated with new email`);
                    return false;
                });
            } else {
                res.send(`Failed edit user Email. Please provide a valid userID and email in json format`);
            }
        }
    })
}


/**
 * Edit user name.
 * req data body parameters should look like below
 * {"userID": "-MSENrLz3I7hVBJcLVD5","address": "Banani"}
 * Header: "Authentication" => Bearer jwtToken
 * 
 */
exports.editUserAddress = (req, res) => {

    jwt.verify(req.token, 'my-secret-key', function (err, data) {
        if (err) {
            res.json(err);
            return false;
        } else {
            let givenUserID = _.get(req.body, ['userID'], undefined);
            let givenAddress = _.get(req.body, ['address'], undefined);

            // -MSENrLz3I7hVBJcLVD5
            if (givenUserID && givenAddress) {
                database.ref(`/food-delivery-app/users/${givenUserID}/publicInfo`).update({ address: givenAddress }).then(snapshot => {
                    res.send(`Database updated with new address`);
                    return false;
                });
            } else {
                res.send(`Failed edit user address. Please provide a valid userID and address in json format.`);
            }
        }
    })
    
}
    