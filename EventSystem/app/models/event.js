// Event model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userModel = mongoose.model('User').schema,
  townModel = mongoose.model('Town').schema,
  commentModel = mongoose.model('Comment').schema,
  ratingModel = mongoose.model('Rating').schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  town: townModel,
  user: userModel,
  comments: [commentModel],
  rating: [ratingModel]
});

EventSchema.path('date').validate(function(val){
  return val > Date.now
}, "Date should be greater than current date!");

mongoose.model('Event', EventSchema);

