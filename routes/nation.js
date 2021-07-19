// Routes for General Clients..
const express = require('express');
var exphbs = require('express-handlebars');
var moment = require('moment');


const router = express.Router();
const app = express();

app.engine('.hbs', exphbs({
  extname: '.hbs'
}));

const Events = require('../controllers/eventsController');
const EventsService = Events.EventsService;

const Clients = require('../controllers/clientController');
const ClientsService = Clients.ClientsService;

const Reserve = require('../controllers/reservationController');
const ReservationsService = Reserve.ReservationsService;

router.get('/open/', (req, res, next) => {
  res.redirect("/");
});

router.get('/open/:name', (req, res, next) => {
  // generic landing for everyone thats not admin
  if (req.params.name == null || !req.params.name) res.redirect("/");

  res.render('nation/open/unknownVisitor', {
    layout: 'nationLayout/checkPoint',
    template: 'Welcome ' + req.params.name + '.',
    data: null,
    // helpers for index view
    helpers: {
      'showCheckPointWelcome'() {
        return ('Welcome ' + req.params.name + '.');
      },
      'simpleName'() {
        return (req.params.name);
      },
    }
  });

});

router.post('/open/:name', (req, res, next) => {

  if (req.body.name && req.body.email) {
    // so here we are creating a new user based on the email given.
    // first up find the user..
    ClientsService.checkItOut(req).then((visitor) => {

      // we check if the client has a password set.
      // if not we keep it moving..


      if (visitor != null) {
        console.log("client seems to be existatnce.");
        req.session.user = req.body.email;
        req.session.user_id = visitor._id;
        req.session.name = req.body.name;
        // everyone goes to the same landing page
        res.redirect(req.session.name + "/events/");
      } else {

        // if the user doesn't exist then create their account.
        console.log("that client is new.. supposedly");
        ClientsService.create(req).then((client) => {
          req.session.user = client.email;
          req.session.user_id = client._id;
          req.session.name = req.body.name;

          // everyone goes to the same landing page
          res.redirect(req.session.name + "/events/");
        });
      }

    });
  }
});

router.get('/open/:name/events/', (req, res, next) => {

  if (req.session.user_id) {

    EventsService.public()
      .then((eventInfo) => {
        // we want to make signed up list and open list..

        ReservationsService.readClient(req.session.user_id).then((reserves) => {
          let oe = eventInfo;
          let rs = [];
          // handle if its null

          if (reserves != null) {
            for (p = 0; p < reserves.length; p++) {
              // for each reserve we want to go into events and pick them out
              for (i = 0; i < eventInfo.length; i++) {
                if (eventInfo[i].eventNum == reserves[p].eventNum) {
                  // this means this event is reserved.
                  reserves[p].title = eventInfo[i].title;
                  rs.push(reserves[p]);
                  // remove this event from list of available events.
                  oe.splice(i, 1);
                }
              }
            }
          }

          res.render('nation/open/lobby', {
            layout: 'nationLayout/lobby',
            template: 'Welcome ' + req.session.name + '.',
            eventInfo: eventInfo,
            OpenEvents: oe,
            Reservations: rs,
            helpers: {
              'showCheckPointWelcome'() {
                return ('Welcome ' + req.session.name + '.');
              },
              'simpleName'() {
                return (req.params.name);
              },
              'numberOfReservations'() {
                return (rs.length);

              },
              'avaliableEvents'() {
                return (oe.length);

              },
              'giveWidth'() {
                return ((rs.length * 300));

              },
              'giveMaxWidth'() {
                if (((rs.length * 300) - 300) > 5000) {
                  return ((rs.length * 300) - ((rs.length + 1) * 50));

                } else if (rs != 1) {
                  return ((rs.length * 300) - ((rs.length + 1) * 50));

                } else {
                  return 400;
                }
              }
            }
          });

        });

      });


  } else {

    res.redirect('/');
  }

});


router.get('/open/:name/event/:id', (req, res, next) => {

  if (req.session.user_id) {
    EventsService.eventNum(req.params.id)
      .then((eventInfo) => {
        ReservationsService.getReservation(req.params.id, req.session.user_id)
          .then((reservation) => {
            res.render('nation/reserve/view', {
              layout: 'nationLayout/signUpEvents',
              template: 'Welcome ' + req.session.name + '.',
              event: eventInfo,
              reservation: reservation,
              helpers: {
                'showCheckPointWelcome'() {
                  return ('Welcome ' + req.session.name + '.');
                },
                'simpleName'() {
                  return (req.params.name);
                },
                'avaliableEvents'() {
                  return (oe.length);

                },
                'niceDate'(tmp) {
                  return moment(eventInfo.eventDate).format("MMM Do, YYYY");
                }

              }
            });

          });

      });


  } else {

    res.redirect('/');
  }

});

router.get('/event/:id/reserve', (req, res, next) => {
  if (req.session.user_id) {
    EventsService.eventNum(req.params.id).then((event) => {
      res.render('nation/reserve/table', {
        layout: 'nationLayout/signUpEvents',
        template: 'Welcome ' + req.session.name + '.',
        eventInfo: event,
        userId: req.session.user_id,
        helpers: {
          'showCheckPointWelcome'() {
            return ('Welcome ' + req.session.name + '.');
          },
          'simpleName'() {
            return (req.session.name);
          },
          'niceDate'(tmp) {
            return moment(event.eventDate).format("MMM Do, YYYY");
          }

        }
      });

    }).catch((err) => {
      res.status(404);
      res.send("nope..");
      res.end();
    });

  } else {
    res.redirect("/");
  }
});
module.exports = router;
