// events api
var express = require('express');
var router = express.Router();


const Clients = require('../../controllers/clientController');
const ClientsService = Clients.ClientsService;

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

// create
router.post('/create', (req, res, next) => {
  ClientsService.create(req).then((client) => {
    res.status(200);
    res.send(JSON.stringify(client));
  });
});


// list/ open find
router.get('/', (req, res, next) => {
  if(req.user ){
    ClientsService.list().then((clients) => {
        res.status(200);
        res.send(JSON.stringify(clients));
    });
  }else{
    res.status(200);
    res.send("Premission Denied. Auth is needed.");
  }
});

// findOne/ read
router.get('/:id', (req, res, next) => {
    ClientsService.read(req.params.id).then((event) => {
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
    let updatedData = req.body;
    ClientsService.update(req.params.id, updatedData).then((updatedEvent) => {
        res.status(200);
        res.send(JSON.stringify(updatedEvent));
    }).catch((err) => {
        res.status(404);
        res.send("nope..");
        res.end();
    });
});

// delete
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    ClientsService.delete(req.params.id)
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
    res.status(500);
    res.send("these are not the droids you are searching for..");
    res.end();
});


module.exports = router;
