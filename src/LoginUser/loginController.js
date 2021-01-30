
const { database } = require('../../firebase');
const _ = require('lodash');
var jwt = require('jsonwebtoken');


/**
 * LOGIN USER WITH EMAIL AND PASSWORD
 * REQ DATA SHOULD LOOK LIKE BELOW:
 * {"email":"towhid@gmail.com", "password":"12345"}
 */
exports.loginUser = (req, res) => {
    let email = _.get(req.body, ['email'], undefined);
    let password = _.get(req.body, ['password'], undefined);

    if (email && password) {
        
        let token = jwt.sign({
            email: email
        }, 'my-secret-key', { expiresIn: '1h' });

        database.ref(`/food-delivery-app/users`).once("value").then(snapshot => {
            let allUsers = snapshot.val();
            for (let uid in allUsers) {
                let dbEmail = _.get(allUsers[uid], ['publicInfo', 'email'], undefined);
                let dbPassword = _.get(allUsers[uid], ['publicInfo', 'password'], undefined);
                if ((email === dbEmail) && (password === dbPassword)) {
                    database.ref(`/food-delivery-app/users/${uid}/publicInfo`).update({ token: token }).then(() => {
                        res.json({
                            message: "success. User is logged in. Token added into db",
                            token: token
                        });

                        return false;
                    })
                } else {
                    // TODO need to validate if wrong id and password provided
                    console.log("not matched with id/password.");
                }
            }
        }).catch(err => {
            res.json(err);
        })
        
    }
}