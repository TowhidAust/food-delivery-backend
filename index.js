const express = require('express');
const { database } = require('./firebase');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

// Load the full build of loadash.

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

// CREATE USER
const createUserRoute = require('./src/CreateUser/createUserRoutes');
createUserRoute(app);

// EDIT USERS DATA
const editUserRoute = require('./src/EditUser/editUserRoutes');
editUserRoute(app);

// LOGIN USER
const loginUserRoute = require('./src/LoginUser/loginRoutes');
loginUserRoute(app);

// GET MENU ITEMS
const getMenusRoute = require('./src/GetMenus/menusRoutes');
getMenusRoute(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})