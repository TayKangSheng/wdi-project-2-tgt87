const Contribution = require('../models/contribution')
const User = require('../models/user')
const Comment = require('../models/comment')
const cloudinary = require('cloudinary')

var contributionController = {
  list: function(req, res, next){
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
    var arrOfCommentIds = []
    for (var id in req.body.comments){
      arrOfCommentIds.push(id)
    }
    cloudinary.uploader.upload(req.file.path, function(result) {
    Contribution.create({
      item: req.body.item,
      description: req.body.description,
      action: req.body.action,
      address: req.body.address,
      image: result.url,
      contributor: req.body.contributor,
      contributorEmail: req.body.contributorEmail,
      comments: arrOfCommentIds
      }, function(err, output){
      if (err) {
      if (err.name === 'ValidationError') {
        var errMessages = []
        for (field in err.errors) {
          errMessages.push(err.errors[field].message)
        }
        req.flash('flash', {
          type: 'danger',
          message: errMessages
        })
        res.redirect('/user')
      }
      return next(err)
    }
    req.flash('flash', {
      type: 'success',
      message: 'Successfully added new contribution'
    })
      User.findById(output.contributor, function(err, creator){
        if (err) return next(err)
        creator.local.contributions.push(output.id)
        creator.save(function(err, saved){
          if (err) return next(err)
        })
      })
      res.redirect('/user')
    })
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
      req.flash('flash', {
        type: 'success',
        message: 'Successfully updated a contribution.'
      })
      res.redirect('/user')
    })
  },
  delete: function(req, res, next) {
  Contribution.findByIdAndRemove(req.params.id, function(err, contribution) {
    if (err) return next(err)
    req.flash('flash', {
      type: 'danger',
      message: 'Deleted a contribution.'
    })
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
