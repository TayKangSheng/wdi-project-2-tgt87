var mongoose = require('mongoose')
var commentSchema = new mongoose.Schema({
  comment: String,
  commentor: String,
  contributionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contribution'
  }
})

var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
