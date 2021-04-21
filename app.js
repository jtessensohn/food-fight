var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./models')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teamsRouter = require('./routes/teams');
const fightsRouter = require('./routes/fights');

var app = express();

const store = new SequelizeStore({ db: db.sequelize })
app.use(
  session({
    secret: 'pancakes',
    resave: false,
    saveUninitialized: false,
    store: store
  })
)
store.sync()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/teams', teamsRouter);
app.use('/api/v1/fights', fightsRouter);

// send all other requests to react index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

module.exports = app;
