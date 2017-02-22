module.exports = function(req, res, next) {
  if(req.isAuthenticated()) return next()
  req.flash('flash', {
    type: 'danger',
    message: 'You have to login to view contents.'
  })
  return res.redirect('/login')
}
