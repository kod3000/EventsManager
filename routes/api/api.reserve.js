var express = require('express');
var router = express.Router();

const Events = require('../../controllers/eventsController');
const EventService = Events.EventsService;

const Reserve = require('../../controllers/reservationController');
const ReservationsService = Reserve.ReservationsService;

router.use((req, res, next) => {
    res.set({
        // allow any domain, allow REST methods we've implemented
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers",
        // Set content-type for all api requests
        'Content-type': 'application/json'
    });
    if (req.method == 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

router.post('/', async (req, res, next) => {

    let reservationBuilder = {
        eventNum: req.body.eventNum,
        clientId: req.body.userId,
        reservationName: req.body.title,
        numberInParty: req.body.party,
        numberOfVegans: req.body.vegan,
    }
    try {

      // lets make this work both as api json and redirect to our system
      var tmpUrl = req.headers.referer;
      var unlockUrl = tmpUrl.slice(tmpUrl.length-7, tmpUrl.length);
      const eventQueried = await EventService.eventNum(req.body.eventNum);
      let seatsUsed = 0;
      if( eventQueried.seatsOccupied == null || isNaN(parseFloat(eventQueried.seatsOccupied))){
        seatsUsed = parseFloat(req.body.party);
      }else{
        seatsUsed = parseFloat(eventQueried.seatsOccupied) + parseFloat(req.body.party);
      }
      let veganSeats = 0;
      if( eventQueried.seatsVegatarian == null || isNaN(parseFloat(eventQueried.seatsVegatarian))){
        veganSeats = parseFloat(req.body.vegan);
      }else{
        veganSeats = parseFloat(eventQueried.seatsVegatarian) + parseFloat(req.body.vegan);
      }
      EventService.updateSeats(eventQueried._id, seatsUsed, veganSeats);
      const reservationSaved = await ReservationsService.create(reservationBuilder)

        if( unlockUrl ==  "reserve"){
         // if it came from html send them back..
        res.redirect('/nation/open/'+req.body.title+'/events' );
       }else{
          // if it came from api call give them json
          res.status(201);
          res.send(JSON.stringify(reservationSaved));
         }

    }catch (err) {

        throw new Error("RABBLERABLLE ERROR: ", reservationBuilder);
    }
});


module.exports = router;
