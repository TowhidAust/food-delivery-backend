const express = require('express');
const { database } = require('./firebase');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
// Load the full build of loadash.
const _ = require('lodash');

// allow the origins here.
let allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5000',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:443',

]
// Configuring cross origin resource sharing
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = `The CORS policy for this site does not ' +
                'allow access from the specified Origin. ${allowedOrigins} & ${allowedOrigins.indexOf(origin)}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

var jsonParser = bodyParser.json();
app.use(jsonParser);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


/**
 * CREATE USER
 * accepts a body json object
 * name email address looks like below
 * {"name":"towhid", "email":"test@gmail.com", "address": "dhanmondi"}
 */
app.post('/create-user', function(req, res){
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
            database.ref('/food-delivery-app/users').push(userInfo).then(snapshot=>{
                res.send({"success":"User Created"});
            }).catch(err=>{
                
                console.log(err.code);
                res.send({"err": `${err.code}`})
            }
            );
        }
    }).catch(err=> console.log(err));
   
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})