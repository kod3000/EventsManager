// routes for admin/super users only
const express = require('express');
var exphbs = require('express-handlebars');
const router = express.Router();
const app = express();

//controllers
const Events = require('../controllers/eventsController');
const EventsService = Events.EventsService;
const Clients = require('../controllers/clientController');
const ClientsService = Clients.ClientsService;


// handle root directory of embassy
router.get('/', (req, res, next) => {
  if (req.user == null) {
    res.redirect("/");
  } else {
    res.redirect('/lobby');
  }
});

// main lobby for admin users
router.get('/lobby', (req, res, next) => {
  if (req.user == null) {
    // throw this person to the start..
    res.redirect("/");
  } else {
    EventsService.list().then((events) => {
      ClientsService.list().then((clients) => {

        res.render('embassy/lobby', {
          layout: 'embassyLayout/lobby',
          template: 'Welcome to Events',
          dataEvents: events.reverse(),
          // helpers for index view
          helpers: {
            'reverseWord'(msg) {
              return (msg + '!!!');
            },
            'simpleName'() {
              return (req.user.username);
            },
            'numberEvents'() {
              return events.length;
            },
            'numberClients'() {
              return clients.length;
            },
          }
        });

      });
    });
  }
});

router.get('/edit/event/:id', (req, res, next) => {
  if (req.user == null) {
    // throw this person to the start..
    res.redirect("/");
  } else {
    // go ahead and edit what you want..
      EventsService.eventNum(req.params.id).then((event) => {
        res.render('embassy/eventEdit', {
          layout: 'embassyLayout/lobby',
          template: 'Welcome to Events',
          dataEvent: event,
          // helpers for index view
          helpers: {
            'reverseWord'(msg) {
              return (msg + '!!!');
            },
            'simpleName'() {
              return (req.user.username);
            },
          }
      });
    });
  }

});


// login admin user
router.get('/:name', (req, res, next) => {
  // the only way of getting here is by typing "admin/" into mainpage
  if (!req.params.name) res.redirect("/");
  res.render('embassy/checkPoint', {
    layout: 'embassyLayout/login',
    template: 'Welcome to Events',
    helpers: {
      'reverseWord'(msg) {
        return (msg + '!!!');
      },
      'simpleName'() {
        return (req.params.name);
      },
    }
  });

});

// create admin user
router.get('/declare/delegate', (req, res, next) => {

  res.render('embassy/delegateDeclare', {
    layout: 'embassyLayout/newDelegate',
    template: 'Create a new Admin',

    // helpers for index view
    helpers: {
      'reverseWord'(msg) {
        return (msg + '!!!');
      },
      'simpleName'() {
        return (req.params.name);
      },
    }
  });

});


module.exports = router;
