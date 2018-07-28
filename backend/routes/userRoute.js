const userService = require('../services/userService')

module.exports = (app) => {


    app.post('/signup', (req, res) => {
        const user = req.body;
        userService.add(user)
            .then(user => res.json(user))
    })
    app.put(`/login`, (req, res) => {
        const user = req.body
        userService.userLogin(user)
            .then(user => res.json(user))
    })

}