const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService.js');

function query(query = {}) {
	// build query for mongodb
	let mongodbQuery = {};

	if (!query.lng && !query.lat) {
		mongodbQuery = query;
	} else {
		mongodbQuery.location = {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: [+query.lng, +query.lat]
				},
				$maxDistance: +query.distance
			}
		};
	}

	if (query.category) {
		mongodbQuery.category = query.category;
	}

	return mongoService.connect().then(db => {
		const collection = db.collection('eventi');
		return collection.find(mongodbQuery).toArray();
	});
}
function remove(eventiId) {
	eventiId = new ObjectId(eventiId);
	return mongoService.connect().then(db => {
		const collection = db.collection('eventi');
		return collection.remove({ _id: eventiId });
	});
}

function getById(eventiId) {
	eventiId = new ObjectId(eventiId);
	return mongoService.connect().then(db => {
		const collection = db.collection('eventi');
		return collection.findOne({ _id: eventiId });
	});
}

function add(eventi) {
	return mongoService.connect().then(db => {
		const collection = db.collection('eventi');
		return collection.insertOne(eventi).then(result => {
			eventi._id = result.insertedId;
			return eventi;
		});
	});
}

function update(_id, updateData) {
	_id = new ObjectId(_id);

	// convert  ISO 8601 time to timestamp
	let { startTime, endTime } = updateData;

	if (startTime) updateData.startTime = new Date(startTime).getTime();
	if (endTime) updateData.endTime = new Date(endTime).getTime();

	// delete ownerId and going users
	// this fields contain ObjectId and we don't want to overide them
	delete updateData.ownerId;
	delete updateData.goingUserId;
	delete updateData._id;

	return mongoService.connect().then(db => {
		const collection = db.collection('eventi');
		return collection
			.updateOne({ _id: _id }, { $set: updateData })
			.then(res => {
				return res;
			});
	});
}

function eventiAddUser({ eventiId }, { userId }) {
	const _id = new ObjectId(eventiId);
	return mongoService
		.connect()
		.then(db => db.collection('eventi'))
		.then(collection =>
			collection.updateOne({ _id }, { $addToSet: { goingUserId: userId } })
		);
}

function eventiRemoveUser({ eventiId }, { userId }) {
	const _id = new ObjectId(eventiId);
	return mongoService
		.connect()
		.then(db => db.collection('eventi'))
		.then(collection =>
			collection.updateOne({ _id }, { $pull: { goingUserId: userId } })
		);
}

module.exports = {
	query,
	remove,
	getById,
	add,
	update,
	eventiAddUser,
	eventiRemoveUser
};
