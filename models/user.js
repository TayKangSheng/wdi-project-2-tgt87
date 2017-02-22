const bcrypt = require('bcryptjs')
var mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({
  local: {
    email: String,
    password: String,
    contributions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Contribution'
    }]
  }
})

UserSchema.statics.encrypt = function(password){
  return bcrypt.hashSync(password, 10)
}

UserSchema.methods.validPassword = function(givenpassword){
  return bcrypt.compareSync(givenpassword, this.local.password)
}

var User = mongoose.model('User', UserSchema)

module.exports = User
