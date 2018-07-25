const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService.js')

function query() {


    return mongoService.connect()
        .then(db => {
            const collection = db.collection('eventi');
            return collection.find({}).toArray()
        })
}

function remove(eventiId) {
    eventiId = new ObjectId(eventiId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('eventi');
            return collection.remove({ _id: eventiId })
        })
}


function getById(eventiId) {
    console.log('got into eventi service with id', eventiId);
    eventiId = new ObjectId(eventiId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('eventi');
            return collection.findOne({ _id: eventiId })
        })
}

function add(eventi) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('eventi');
            return collection.insertOne(eventi)
                .then(result => {
                    eventi._id = result.insertedId;
                    return eventi;
                })
        })
}

function update(eventi) {
    eventi._id = new ObjectId(eventi._id)
    console.log('new eventi', eventi)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('eventi');
            return collection.updateOne({ _id: eventi._id }, { $set: eventi })
                .then(res => {
                    console.log('eventi!!')
                    return eventi;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}