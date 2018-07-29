const userService = require('../services/userService');
const eventiService = require('../services/eventiService');
const ObjectId = require('mongodb').ObjectId;

module.exports = app => {

  app.post('/signup', (req, res) => {
    const user = req.body;
    userService.add(user).then(user => res.json(user));
  });

  app.put(`/login`, (req, res) => {
    const user = req.body;
    userService.userLogin(user).then(user => res.json(user));
  });


  app.get('/user', (req, res) => {
    // TODO use aggregation
    let userId = ObjectId('5b5849a76329dd4b6b6ca7cc');
    let user = userService.query(userId);
    let myEventi = eventiService.query({ ownerId: userId });
    let eventiHistory = eventiService.query({
      goingUserId: { $in: [userId] }
    });

    Promise.all([user, myEventi, eventiHistory]).then(
      ([user, myEventi, eventiHistory]) => {
        user.myEventiData = myEventi;
        user.eventiHistoryData = eventiHistory;
        res.json(user);
      }
    );
  });
};

