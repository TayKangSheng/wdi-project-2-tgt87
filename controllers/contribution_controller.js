const Contribution = require('../models/contribution')
const User = require('../models/user')
const Comment = require('../models/comment')
var contributionController = {
  list: function(req, res){
    Contribution.find({status: 'available'}, function(err, output){
      if(err) throw err
      res.render('contributions/index', {contributions: output})
    })
  },
  show: function(req, res){
    Contribution.findById(req.params.id)
                .populate('comments')
                .exec(function (err, output) {
                  if (err) throw err
    res.render('contributions/show', { contribution: output })
  })
  },
  create: function(req, res){
    Contribution.create(req.body,function(err, output){
      if(err) throw err
      User.findById(output.contributor, function(err, creator){
        if(err) throw err
        creator.local.contributions.push(output.id)
        creator.save(function(err, saved){
          if(err) throw err
        })
      })
      res.redirect('/user')
    })
  },
  edit: function(req, res){
    Contribution.findById(req.params.id, function(err, output){
      if(err) throw err
      res.render('contributions/edit', {contribution: output})
    })
  },
  update: function(req, res){
    Contribution.findByIdAndUpdate(req.params.id, req.body, function(err, contribution) {
      if (err) throw err
      res.redirect('/user')
    })
  },
  delete: function(req, res) {
  Contribution.findByIdAndRemove(req.params.id, function(err, contribution) {
    if (err) throw err
    res.redirect('/user')
  })
},
  comment: function(req, res){
    Comment.create(req.body, function(err, output) {
      if (err) throw err
      Contribution.findById(req.params.id, function (err, contribution) {
        if(err) throw err
        contribution.comments.push(output.id)
        contribution.save(function (err, saved) {
          if(err) throw err
          res.redirect('/contributions/' + req.params.id)
        })
      })
    })
  }
}

module.exports = contributionController
