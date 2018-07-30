const eventiService = require('../services/eventiService');
const ObjectId = require('mongodb').ObjectId;
const URL = '/eventi';

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.session.user) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

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

  app.post(`${URL}/edit/`, isAuthenticated, (req, res) => {
    // if (!req.session.loggedinUser.isAdmin) return
    const eventi = req.body;

    // normalize eventi object
    eventi.ownerId = req.session.user._id;
    eventi.feed = [];
    eventi.goingUserId = [];
    eventi.clapsCount = 0;
    eventi.startTime = new Date(eventi.startTime).getTime();
    eventi.endTime = new Date(eventi.endTime).getTime();

    eventiService.add(eventi).then(eventi => {
      res.json(eventi);
    });
  });

  app.put(`${URL}/edit/:eventiId`, isAuthenticated, (req, res) => {
    // if (!req.session.loggedinUser.isAdmin) return
    const updateData = req.body;
    const _id = req.params.eventiId;
    eventiService
      .update(_id, updateData)
      .then(updateResult => res.json(updateResult));
  });

  app.put(`${URL}/incEventiClap/:eventiId`, (req, res) => {
    const updateData = req.body;
    const _id = req.params.eventiId;
    //check that user only sends clapsCount
    if (
      Object.keys(updateData).length === 1 ||
      updateData.hasOwnProperty('clapsCount')
    ) {
      eventiService
        .update(_id, updateData)
        .then(updateResult => res.json(updateResult));
    } else {
      res.status(400).send('bad request');
    }
  });
};
