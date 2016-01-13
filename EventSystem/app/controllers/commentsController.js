var Comment = require('mongoose').model('Comment');

module.exports = {
  getCommentCreationForm: function(req, res){
    res.render('comment/create-comment',{
      title: 'Create new comment',
      user: req.user,
      eventId: req.params.id
    });
  },
  postComment: function(req, res) {
    var newPost = {};
    newPost = {
      content: req.body.content,
      userId: req.body.userId,
      eventId: req.body.eventId
    };

    Comment.create(newPost, function(err, createdComment){
      if (err) {
        console.log('Failed to create new comments: ' + err);
        return;
      }

      res.redirect('events/' + eventId,{
        title: 'New event',
        user: req.user,
        comment: createdComment
      });
  });
}};
