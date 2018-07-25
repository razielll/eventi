const EVENTI_URL = '/';
const eventiService = require('../services/toyService')


module.exports = (app) => {

    app.get('/', (req, res) => {
        eventiService.query()
            .then(eventis => res.json(eventis))
    })

    app.get('/:eventiId', (req, res) => {
        const eventiId = req.params.eventiId;
        return eventiService.getById(eventiId)
            .then(eventi => {
                res.json(eventi)
            })
    })


    app.delete('/:eventiId', (req, res) => {
        // if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) return
        const eventiId = req.params.eventiId;
        eventiService.remove(eventiId)
            .then(() => res.end(`event ${eventiId} Deleted `))

    })

    app.post('/eventi', (req, res) => {
        // if (!req.session.loggedinUser.isAdmin) return
        const eventi = req.body;
        eventiService.add(eventi)
            .then(eventi => {
                res.json(eventi)
            })
    })

    app.put('/eventi/:eventiId', (req, res) => {
        // if (!req.session.loggedinUser.isAdmin) return
        const eventi = req.body;
        eventiService.update(eventi)
            .then(toy => res.json(eventi))
    })
}