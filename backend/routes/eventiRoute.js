const eventiService = require('../services/eventiService');
const chatService = require('../services/chatService');
const isAuthenticated = require('../services/authService').isAuthenticated;

const ObjectId = require('mongodb').ObjectId;
const URL = '/eventi';

module.exports = app => {
  app.get(URL, (req, res) => {
    console.log('Got query:', req.query);
    const query = req.query;
    eventiService.query(query).then(eventis => res.json(eventis));
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

  app.put(`${URL}/:eventiId`, (req, res) => {
    const eventiId = req.params;
    const userId = req.body;
    return eventiService
      .eventiAddUser(eventiId, userId)
      .then(updatedEventi => res.json(updatedEventi));
  });

  app.put(`${URL}/removeUser/:eventiId`, (req, res) => {
    const eventiId = req.params;
    const userId = req.body;
    return eventiService
      .eventiRemoveUser(eventiId, userId)
      .then(userRemoved => {
        // console.log('removeed user from DB')
        return res.json(userRemoved);
      });
  });

  //chat save message
  app.put(`${URL}/:eventiId/saveMessage`, (req, res) => {
    const eventiId = req.params;
    const msg = req.body;
    // console.log('backend eventi route save message got', eventiId, msg);
    // if (msg.txt === '') return false
    return chatService.saveMessage(eventiId, msg);
  });
};
