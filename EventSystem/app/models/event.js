// Event model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  commentModel = mongoose.model('Comment').schema,
  ratingModel = mongoose.model('Rating').schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  town: String,
  userId: String,
  username: String,
  image: String,
  comments: [commentModel],
  rating: [ratingModel],
  users: [{
    userId: String,
    username: { type: String, unique: "User cannot join event twice" }
  }]
});

//
//EventSchema.path('date').validate(function(val){
//  return val > Date.now
//}, "Date should be greater than current date!");

mongoose.model('Event', EventSchema);

