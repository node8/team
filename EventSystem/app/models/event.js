// Event model
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  townModel = mongoose.model('Town').schema,
  commentModel = mongoose.model('Comment').schema,
  ratingModel = mongoose.model('Rating').schema;

var EventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  town: String,
  userId: String,
  username: String,
  comments: [commentModel],
  rating: [ratingModel]
});
//
//EventSchema.path('date').validate(function(val){
//  return val > Date.now
//}, "Date should be greater than current date!");

mongoose.model('Event', EventSchema);

