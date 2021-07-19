var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
require('./controllers/passport');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const apiEvents = require('./routes/api/api.events');
const defaultRoute = require('./routes/defaultRoute');
const apiAdmin = require('./routes/api/api.ambassadors');
const apiNation = require('./routes/api/api.clientBank');
const apiReserve = require('./routes/api/api.reserve');


const adminRoute = require('./routes/embassy');

const clientRoute = require('./routes/nation');

// still waiting..
//const events = require('./routes/events');
//const reserve = require('./routes/reserve');


var app = express();
// Use Handlebars view engine
app.set('view engine', 'handlebars');
app.use(bodyparser.urlencoded({
  extended: false
}));

// Register Handlebars view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));
app.use(cookieParser('eventManager-secret'));
app.use(session({
  secret:"eventManager",
  resave: "true",
  saveUninitialized: "true"
}));

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

var monogoOptions = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.Promise = global.Promise;
// data connections
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/demoTime`, monogoOptions)
  .catch((err) => {
    console.error(`database connection error: ${err}`);
    process.exit();
  });



// our routes..
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/events/', apiEvents);
app.use('/api/ambassadors/', apiAdmin);
app.use('/api/nation/', apiNation);
app.use('/api/reserve/', apiReserve);

//

//app.use('/api/system/', apiUserBank);-- here is the processed user bank

app.use('/nation', clientRoute);
app.use('/embassy', adminRoute);
app.use('/', defaultRoute);

//app.use('/events', events);
//app.use('/reserve', reserve);


// error page is where the static is..
app.use((req, res, next) => {
  //error
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})

module.exports = app;
