var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userModel = mongoose.model('User').schema;

var CommentSchema = new Schema({
  user: userModel,
  eventId: String,
  content: String
});

CommentSchema.path('content').validate(function(value) {
  return 5 < value.length && value.length < 1024;
}, 'Comment content length is invalid');

mongoose.model('Comment', CommentSchema);
