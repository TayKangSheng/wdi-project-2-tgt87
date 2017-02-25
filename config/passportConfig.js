var LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')
module.exports = function(passport){
  passport.serializeUser(function(user, next){
    next(null, user.id)
  })
  passport.deserializeUser(function(id, next){
    User.findById(id, function(err, user){
      next(err, user)
    })
  })

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, givenpassword, next) {
  User.findOne({'local.email': email}, function (err, foundUser) {
    if(err) return next(err)
    if(!foundUser) {
      return next(err, false, req.flash('flash', {
      type: 'warning',
      message: 'This is not a registered email.'
    }))
  }

if(!foundUser.validPassword(givenpassword)) {
  return next(null, false, req.flash('flash', {
    type: 'danger',
    message: 'Access denied: Wrong Password'
  }))
}
    return next(err, foundUser)
  })
}))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function(req, email, password, next){
    User.findOne({'local.email': email}, function(err, foundUser){
      if(foundUser){
        return next(null, false, req.flash('flash', {
          type: 'warning',
          message: 'This email is already being used.'
        }))
      } else {
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password)
          }
        })
        newUser.save(function(err, output){
          return next(null, output, req.flash('flash', {
            type: 'success',
            message: 'Signup success'
          }))
        })
      }
    })
  }))
}
