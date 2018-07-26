const userService = require('../services/userService');
const ObjectId = require('mongodb').ObjectId;

module.exports = (app) => {
    app.get('/user', (req, res) => {
        let userId = ObjectId("5b5849a76329dd4b6b6ca7cc");
        userService.query(userId).then(user => {
            res.json(user);
        })
    })    
}