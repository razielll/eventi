const mongoService = require('./mongoService.js');

function query(userId) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.findOne({"_id" : userId})
  });
}

module.exports = {
  query
};
