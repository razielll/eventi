const eventiService = require('../services/eventiService')
const ObjectId = require('mongodb').ObjectId;
const URL = '/eventi'

module.exports = (app) => {

    app.get('/', (req, res) => {
        eventiService.query()
            .then(eventis => res.json(eventis))
    })

    app.get(`${URL}/:eventiId`, (req, res) => {
        const eventiId = req.params.eventiId;
        return eventiService.getById(eventiId)
            .then(eventi => {
                res.json(eventi)
            })
    })

    app.delete(`${URL}/:eventiId`, (req, res) => {
        // if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) return
        const eventiId = req.params.eventiId;
        eventiService.remove(eventiId)
            .then(() => res.end(`event ${eventiId} Deleted `))

    })

    app.post(`${URL}/edit/`, (req, res) => {
        // if (!req.session.loggedinUser.isAdmin) return
        const eventi = req.body;

        // normalize eventi object
        eventi.ownerId = new ObjectId('5b5849a76329dd4b6b6ca7cc');
        eventi.feed = [];
        eventi.goingUsersIds = [];
        eventi.clapsCount = 0;
        eventi.startTime = new Date(eventi.startTime).getTime();
        eventi.endTime = new Date(eventi.endTime).getTime();

        eventiService.add(eventi)
            .then(eventi => {
                res.json(eventi)
            })
    })

    app.put(`${URL}/edit/:eventiId`, (req, res) => {
        // if (!req.session.loggedinUser.isAdmin) return
        const eventi = req.body;
        eventiService.update(eventi)
            .then(eventi => res.json(eventi))
    })
}