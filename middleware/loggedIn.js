// module.exports = function(req, res, next) {
//   if(req.isAuthenticated()) return next()
//   req.flash('flash', {
//     type: 'danger',
//     message: 'You have to login to view contents.'
//   })
//   return res.redirect('/login')
// }

var loggedIn = {
  isNotLoggedIn: function(req, res, next) {
    if(req.isAuthenticated()) return next()
    req.flash('flash', {
      type: 'danger',
      message: 'You have to login to view contents.'
    })
    return res.redirect('/login')
  },
  isLoggedIn: function(req, res, next) {
    if(req.isAuthenticated() === false) return next()
    req.flash('flash', {
      type: 'danger',
      message: 'You are already login.'
    })
    return res.redirect('/user')
  }
}

module.exports = loggedIn
