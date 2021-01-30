
const { database } = require('../../firebase');
const _ = require('lodash');
const { body, validationResult } = require('express-validator');



/**
 * CREATE USER
 * REQ DATA SHOULD LOOK LIKE BELOW
 * {"name":"towhid", "email":"t@gmail.com", "address": "Dhanmondi", "password":"12345"}
 */
exports.createUser = (req, res) => {

    let userInfo = {publicInfo: req.body};
    // first check if this given email already exists or not
    let givenEmail = req.body.email;
    let isUserExists = false;

    database.ref('/food-delivery-app/users').once("value").then((snapshot)=>{
        let allUsers = snapshot.val();
        if(allUsers){
            for(let uid in allUsers){
                let email = _.get(allUsers[uid], ['publicInfo', 'email'], undefined);
                if( email === givenEmail){
                    isUserExists = true
                    res.send({"failed": "User Already Exists"});
                    return false;
                }  
            }

            if(isUserExists == false){
                database.ref('/food-delivery-app/users').push(userInfo).then(snapshot=>{
                    res.send({"success":"User Created"});
                }).catch(err=>{
                    res.send({"err": err.code})
                });
                return false;
            }

        }else{
            // if there is empty database that means there is no user. so we can add a new user
            database.ref('/food-delivery-app/users').push(userInfo).then(snapshot=>{
                res.send({"success":"User Created"});
            }).catch(err=>{
                
                console.log(err.code);
                res.send({"err": `${err.code}`})
            }
            );
        }
    }).catch(err=> console.log(err));
   
}