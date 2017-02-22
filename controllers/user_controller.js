const Contribution = require('../models/contribution')
const User = require('../models/user')

var userController = {
  list: function(req, res){
      Contribution.find({contributor: req.user.id}, function(err, output) {
        if (err) throw err
      res.render('users/index', { contributions: output })
    })
  }
}


module.exports = userController
