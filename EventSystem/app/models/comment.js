var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CommentSchema = new Schema({
  userId: String,
  eventId: String,
  content: String
});

CommentSchema.path('content').validate(function(value) {
  return 5 < value.length && value.length < 1024;
}, 'Comment content length is invalid');

mongoose.model('Comment', CommentSchema);
