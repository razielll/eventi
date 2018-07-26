module.exports = (app) => {

    app.post('/signup')
    const user = req.body;
    console.log('backend got user:', user);
    userService.add(user)
        .then(user => {
            res.json(user)
        })
}