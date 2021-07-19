var express = require('express');
var router = express.Router();
const multer = require('multer');

const imageController = require('../../controllers/imageController');
const Events = require('../../controllers/eventsController');
const EventService = Events.EventsService;

const upload = multer({
    fileFilter: imageController.imageFilter,

    storage: imageController.storage
});

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

// list/ open find
router.get('/', (req, res, next) => {
    console.log('Api : Listing Events.');

    EventService.list().then((event) => {
        res.status(200);
        res.send(JSON.stringify(event));
    });
});

// findOne/ read
router.get('/:id', (req, res, next) => {
    console.log('Api : Listing Specific Event.');

    EventService.read(req.params.id).then((event) => {
        res.status(200);
        res.send(JSON.stringify(event));
    }).catch((err) => {
        res.status(404);
        res.send("nope..");
        res.end();
    });
});

// update
router.put('/:id', (req, res, next) => {
    console.log('Api : Updating an Event.');
    let updatedData = req.body;
    EventService.update(req.params.id, updatedData).then((updatedEvent) => {
        res.status(200);
        res.send(JSON.stringify(updatedEvent));
    }).catch((err) => {
        res.status(404);
        res.send("nope..");
        res.end();
    });
});

// update
router.post('/:id', (req, res, next) => {
    console.log('Api : Updating an Event.');
    if(req.headers.referer){

    // navigate back to html
    var tmpUrl = req.headers.referer;
    var unlockUrl = tmpUrl.slice( (tmpUrl.length-req.body.eventNum.length)- 11, (tmpUrl.length-req.body.eventNum.length));
  }
    let updatedData = req.body;
    EventService.update(req.params.id, updatedData).then((updatedEvent) => {
      if( unlockUrl ==  "edit/event/"){
        // if it came from html send them back..
        res.redirect('/embassy/lobby');
      }else{
        // if it came from api call give them json
        res.status(201);
        res.send(JSON.stringify(updatedEvent));
      }
    }).catch((err) => {
        res.status(404);
        res.send("nope..");
        res.end();
    });
});

router.post('/', upload.single('image'), async (req, res, next) => {


    let eventBuilder = {
        title: req.body.title,
        seatCapacity: req.body.seatCapacity
    }

    if (req.file) {
        const path = "/static/img/" + req.file.filename;
        eventBuilder.mainImage = {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            imageurl: path,
            title: req.file.originalname,
            filename: req.file.filename,
            size: req.file.size / 1024 | 0,
            description: req.body.description
        }
    }

    try {

      // lets make this work both as api json and redirect to our system
      if(req.headers.referer){
        var tmpUrl = req.headers.referer;
        var unlockUrl = tmpUrl.slice(tmpUrl.length-13, tmpUrl.length);

      }

        const eventSaved = await EventService.create(eventBuilder);
        if( unlockUrl ==  "embassy/lobby"){
          // if it came from html send them back..
          res.redirect('/embassy/lobby');
        }else{
          // if it came from api call give them json
          res.status(201);
          res.send(JSON.stringify(eventSaved));
        }

    } catch (err) {

        throw new Error("EVENTS ERROR", eventBuilder);
    }
});

// delete
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    EventService.delete(req.params.id)
        .then((event) => {
            console.log(`Deleted event: ${id}`);
            res.status(200);
            res.send(JSON.stringify(event));
        }).catch((err) => {
            res.status(404);
            res.end();
        });
});

// error
router.use(function (err, req, res, next) {
    console.error(err);
    res.status(500);
    res.send("these are not the droids you are searching for..");
    res.end();
});


module.exports = router;
