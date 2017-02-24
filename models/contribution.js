var mongoose = require('mongoose')
var contributionSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, 'Please specify your item.']
  },
  description: String,
  action: String,
  status: {
    type: String,
    enum: ['available', 'unavailable'],
    default: 'available'
  },
  address: String,
  image: {
    type: String,
    required: [true, 'Please upload an image of your item.']
  },
  contributor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contributorEmail: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

var Contribution = mongoose.model('Contribution', contributionSchema)

module.exports = Contribution
