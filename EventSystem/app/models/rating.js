var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userModel = mongoose.model('User');

var RatingSchema = new Schema({
  userId: String, // TODO: UserSchema
  value: {type: Number, min: 1, max: 5}
});

RatingSchema.path('userId').validate(function(value) {
  userModel.findOne({id: value}).exec(function(err, user){
    console.log(err);
    console.log(user);
  });
});

mongoose.model('Rating', RatingSchema);
