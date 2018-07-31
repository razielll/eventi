const eventiService = require('../services/eventiService');
const chatService = require('../services/chatService');
const ObjectId = require('mongodb').ObjectId;
const URL = '/eventi';

module.exports = app => {
	app.get('/', (req, res) => {
		eventiService.query().then(eventis => res.json(eventis));
	});

	app.get(`${URL}/:eventiId`, (req, res) => {
		const eventiId = req.params.eventiId;
		return eventiService.getById(eventiId).then(eventi => {
			res.json(eventi);
		});
	});

	app.delete(`${URL}/:eventiId`, (req, res) => {
		// if (!req.session.loggedinUser || !req.session.loggedinUser.isAdmin) return
		const eventiId = req.params.eventiId;
		eventiService
			.remove(eventiId)
			.then(() => res.end(`event ${eventiId} Deleted `));
	});

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
		return eventiService.add(eventi).then(eventi => {
			res.json(eventi);
		});
	});

	app.put(`${URL}/edit/:eventiId`, (req, res) => {
		// if (!req.session.loggedinUser.isAdmin) return
		const updateData = req.body;
		const _id = req.params.eventiId;
		return eventiService.update(_id, updateData)
			.then(updateResult => res.json(updateResult));
	});

	app.put(`${URL}/:eventiId`, (req, res) => {
		const eventiId = req.params
		const userId = req.body
		return eventiService.eventiAddUser(eventiId, userId)
			.then(updatedEventi => res.json(updatedEventi))
	})

	app.put(`${URL}/removeUser/:eventiId`, (req, res) => {
		const eventiId = req.params
		const userId = req.body
		return eventiService.eventiRemoveUser(eventiId, userId)
			.then(userRemoved => {
				// console.log('removeed user from DB')
				return res.json(userRemoved)
			})

	})


	//chat save message
	app.put(`${URL}/:eventiId/saveMessage`, (req, res) => {
		const eventiId = req.params
		const msg = req.body
		console.log('backend eventi route save message got', eventiId, msg);
		// if (msg.txt === '') return false
		return chatService.saveMessage(eventiId, msg)

	})

};
