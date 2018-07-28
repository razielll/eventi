const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService.js');

function query(userId) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.findOne({ _id: userId });
  });
}

function add(user) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    return collection.insertOne(user).then(result => {
      user._id = result.insertedId;
      return user;
    });
  });
}

function userLogin(userLogin) {
  return mongoService.connect().then(db => {
    const collection = db.collection('user');
    let currUser = collection.findOne({
      $and: [{ email: userLogin.email }, { password: userLogin.password }]
    });
    console.log('mongo returned login user:', currUser);
    return currUser;
  });
}

module.exports = {
  add,
  userLogin,
  query
};
