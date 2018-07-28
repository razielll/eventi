const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService.js');

function query(query = {}) {
  return mongoService.connect().then(db => {
    const collection = db.collection('eventi');
    return collection.find(query).toArray();
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
  return mongoService.connect().then(db => {
    const collection = db.collection('eventi');
    return collection
      .updateOne({ _id: _id }, { $set: updateData })
      .then(res => {
        console.log('eventi updated');
        return res;
      });
  });
}

module.exports = {
  query,
  remove,
  getById,
  add,
  update
};
