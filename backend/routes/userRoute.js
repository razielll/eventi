const userService = require('../services/userService');
const eventiService = require('../services/eventiService');

const ObjectId = require('mongodb').ObjectId;

module.exports = app => {
  app.get('/user', (req, res) => {
    // TODO use aggregation
    let userId = ObjectId('5b5849a76329dd4b6b6ca7cc');
    let user = userService.query(userId);
    let eventiHistory = eventiService.query({ ownerId: userId });

    Promise.all([user, eventiHistory]).then(([user, eventiHistory]) => {
      user.eventiHistoryData = eventiHistory;
      res.json(user);
    });
  });
};
