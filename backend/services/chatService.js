const mongoService = require('./mongoService.js');
const ObjectId = require('mongodb').ObjectId;

function saveMessage({ eventiId }, { msg }) {
	const _id = new ObjectId(eventiId)
	// msg.user = (!msg.user) ? '' : msg.user
	return mongoService.connect()
		.then(db => db.collection('eventi'))
		.then(collection => collection.updateOne({ _id }, { $addToSet: { messages: msg } }))
}



module.exports = {
	saveMessage
}