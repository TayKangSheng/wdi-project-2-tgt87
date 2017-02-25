require('dotenv').config({silent: true})
const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(session)
const loggedIn = require('./middleware/loggedIn')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1200000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)
app.use(flash())

app.use(methodOverride('_method'))
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressLayouts)

app.set('view engine', 'ejs')

app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

app.get('/', function (req, res) {
  res.render('homepage')
})

const auth = require('./routes/auth_router')
app.use('/', auth)

app.use(loggedIn.isNotLoggedIn)
const contributions = require('./routes/contribution_router')
app.use('/contributions', contributions)

const users = require('./routes/user_router')
app.use('/user', users)

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('Project2 App is running on ' + port)
})
