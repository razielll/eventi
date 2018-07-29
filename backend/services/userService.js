const ObjectId = require('mongodb').ObjectId;
const mongoService = require('./mongoService.js');

function query(userId) {
  // userId = ObjectId(userId);
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
  return mongoService
    .connect()
    .then(db => db.collection('user'))
    .then(collection =>
      collection
        .findOne({
          $and: [{ email: userLogin.email }, { password: userLogin.password }]
        })
        .then(user =>
          getAllUserData(user._id).then(data => ({ ...user, ...data }))
        )
    );
}

function getAllUserData(userId) {
  return mongoService.connect().then(db => {
    const eventiCl = db.collection('eventi');
    userId = userId.toString();
    let myEventiData = eventiCl.find({ ownerId: userId }).toArray();
    let eventiHistoryData = eventiCl
      .find({ goingUserId: { $in: [userId] } })
      .toArray();

    return Promise.all([myEventiData, eventiHistoryData]).then(
      ([myEventiData, eventiHistoryData]) => {
        return {
          myEventiData,
          eventiHistoryData
        };
      }
    );
  });
}
// function add(user) {
//     return mongoService.connect()
//         .then(db => db.collection('user'))
//         .then(collection => collection.insertOne(user))
//         .then(result => collection.insertOne(user))
//         .then(result => user._id = result.insertedId)
//         .then(user => user)
// }

module.exports = {
  add,
  userLogin,
  query
};
// function userLogin(userLogin) {
//     return mongoService.connect()
//         .then(db => {
//             const collection = db.collection('user');
//             let currUser = collection.findOne({ $and: [{ email: userLogin.email }, { password: userLogin.password }] })
//             return currUser
//         })
// }
