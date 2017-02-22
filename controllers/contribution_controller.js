const Contribution = require('../models/contribution')
const User = require('../models/user')
const Comment = require('../models/comment')

var contributionController = {
  list: function(req, res, next) {
    Contribution.find({status: 'available'}, function(err, output){
      if (err) return next(err)
      res.render('contributions/index', {contributions: output})
    })
  },
  show: function(req, res, next){
    Contribution.findById(req.params.id)
                .populate('comments')
                .exec(function (err, output) {
                  if (err) return next(err)
    res.render('contributions/show', { contribution: output })
  })
  },
  create: function(req, res, next){
    Contribution.create(req.body,function(err, output){
      if (err) return next(err)
      User.findById(output.contributor, function(err, creator){
        if (err) return next(err)
        creator.local.contributions.push(output.id)
        creator.save(function(err, saved){
          if (err) return next(err)
        })
      })
      res.redirect('/user')
    })
  },
  edit: function(req, res, next){
    Contribution.findById(req.params.id, function(err, output){
      if (err) return next(err)
      res.render('contributions/edit', {contribution: output})
    })
  },
  update: function(req, res, next){
    Contribution.findByIdAndUpdate(req.params.id, req.body, function(err, contribution) {
      if (err) return next(err)
      res.redirect('/user')
    })
  },
  delete: function(req, res, next) {
  Contribution.findByIdAndRemove(req.params.id, function(err, contribution) {
    if (err) return next(err)
    res.redirect('/user')
  })
},
  comment: function(req, res, next){
    Comment.create(req.body, function(err, output) {
      if (err) return next(err)
      Contribution.findById(req.params.id, function (err, contribution) {
        if (err) return next(err)
        contribution.comments.push(output.id)
        contribution.save(function (err, saved) {
          if (err) return next(err)
          res.redirect('/contributions/' + req.params.id)
        })
      })
    })
  }
}

module.exports = contributionController
