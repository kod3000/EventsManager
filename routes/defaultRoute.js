const express = require('express');
var exphbs = require('express-handlebars');
const router = express.Router();
const app = express();
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));

const welcome = require('../controllers/welcomeMatController');
const Events = require('../controllers/eventsController');
const EventsService = Events.EventsService;

// main
router.get('/', (req, res, next)=>{
  //erase user instance..
  req.session.user = null;
  req.session.user_id = null;
  req.session.name = null;
  req.user = null;

  EventsService.public()
    .then((events)=>{
      res.render('default/index', {
                    layout: 'mainLayout/welcome',
                    template: 'Welcome to Events',
                    data: events,
                    helpers: {
                        'reverseWord'(msg) {
                            return (msg + '!!!');
                        },
                    }
                });
    })
    .catch((err)=>{
      if (err) {
          // give an error page for this..
      }
    });

});
// here we check if the person is admin or client
router.post('/', welcome.userCheck, (req, res, next)=>{
    next();
});

module.exports = router;
