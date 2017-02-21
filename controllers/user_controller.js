const Contribution = require('../models/contribution')
const User = require('../models/user')

var userController = {
  list: function(req, res){
    // User.find({}, function(err, output){
    //   if(err) throw err
    //   res.render('users/index', {users: output})
    // })
    // User.findById(req.user.id)
    //     .populate('local.contributions')
    //     .exec(function(err, output) {
    //   if (err) throw err
    //   console.log(output)
      //console.log(output.local.contributions[2].item)
      Contribution.find({contributor: req.user.id}, function(err, output) {
        if (err) throw err
        // console.log(output)
      res.render('users/index', { contributions: output })
    })
  }
}


module.exports = userController
