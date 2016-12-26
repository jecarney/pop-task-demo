var User = require('../api/users/model');
var Post = require('../api/posts/model');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trading');

var u = new User();
u.email = 'test@example.org';
u.name = 'Test User';

u.save().then(function(u) {
  Post.find().then((posts) => {
    posts.forEach((post) => {
      post.user = u._id;

      if (post.comments.length == 0) {
        post.comments.push({ user: u._id, content: "Test Comment 1"});
        post.comments.push({ user: u._id, content: "Test Comment 2"});
      }

      if (post.likedBy.length == 0) {
        post.likedBy.push(u._id);
      }

      post.save();
    })
  });
});
