const passport = require('passport')

var authController = {
  signup: function(req, res){
    res.render('auth/signup', {
      flash: req.flash('flash')[0]
    })
  },
  authSignup: function(req, res) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/user',
      failureRedirect: '/signup',
      failureFlash: true
    })
    return signupStrategy(req, res)
  },
   login: function(req, res){
     res.render('auth/login', {
       flash: req.flash('flash')[0]
     })
   },
   authLogin: function(req, res) {
     var loginStrategy = passport.authenticate('local-login', {
       successRedirect: '/user',
       failureRedirect: '/login',
       failureFlash: true
     })
     return loginStrategy(req, res)
   },
   logout: function(req, res) {
     req.logout()
     res.redirect('/')
   }
}

module.exports = authController
