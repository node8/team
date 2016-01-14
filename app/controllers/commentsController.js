var Comment = require('mongoose').model('Comment');
var Event = require('mongoose').model('Event');

module.exports = {
  getCommentCreationForm: function(req, res){
    res.render('comment/create-comment',{
      title: 'Create new comment',
      user: req.user,
      eventId: req.params.id,
      eventName: req.params.title
    });
  },
  getAll: function(req, res) {
    Comment.find({}).exec(function(err, commentsList) {
      if (err) {
        console.log('Failed to get event: ' + err);
        return;
      }
      res.render('comment/list-comments', {
        title: 'Comments list:',
        user: req.user,
        comments: commentsList,
      });
    });
  },
  postComment: function(req, res) {
    var currentEventId = req.body.eventId;
    var currentEventName = req.body.eventName;
    //console.log(req.body);

    var newComment = {};
    newComment = {
      content: req.body.content,
      userId: req.user._id,
      username: req.user.username,
      eventId: currentEventId,
      eventName: currentEventName
    };

    Comment.create(newComment, function(err, createdComment){
      if (err) {
        console.log('Failed to create new comments: ' + err);
        return;
      }

      console.log('commentAdded');

      Event.findById(currentEventId).exec(function(err, event) {
        if(err){
          console.log('Failed to get event: ' + err);
          return;
        }
        event.comments.push(createdComment);
        event.save();
      });

      res.redirect('/events/' + currentEventId);
    });
  }};
