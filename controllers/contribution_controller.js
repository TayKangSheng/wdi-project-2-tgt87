const Contribution = require('../models/contribution')
const User = require('../models/user')

var contributionController = {
  list: function(req, res){
    Contribution.find({status: 'available'}, function(err, output){
      if(err) throw err
      res.render('contributions/index', {contributions: output})
    })
  },
  show: function(req, res){
    Contribution.findById(req.params.id, function(err, output){
      if(err) throw err
      res.render('contributions/show', {contribution: output})
    })
  },
  // new: function(req, res){
  //   res.render('contributions/new')
  // },
  create: function(req, res){
    Contribution.create(req.body,function(err, output){
      if(err) throw err
      // console.log('created id' + output.id)
      // console.log('creator' + output.contributor)
      User.findById(output.contributor, function(err, creator){
        if(err) throw err
        creator.local.contributions.push(output.id)
        // console.log(creator)
        creator.save()
      })
      res.redirect('/contributions')
    })
  },
  edit: function(req, res){
    Contribution.findById(req.params.id, function(err, output){
      if(err) throw err
      console.log(output)
      res.render('contributions/edit', {contribution: output})
    })
  },
  update: function(req, res){
    Contribution.findByIdAndUpdate(req.params.id, req.body, function(err, contribution) {
      if (err) throw err
      res.redirect('/contributions/' + contribution.id)
    })
  },
  delete: function(req, res) {
  Contribution.findByIdAndRemove(req.params.id, function(err, todoItem) {
    if (err) throw err
    res.redirect('/user')
  })
}
}


module.exports = contributionController
