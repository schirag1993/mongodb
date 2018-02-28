const mongoose = require('mongoose');

const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({
      name: 'joe'
    });
    blogPost = new BlogPost({
      title: 'JS is good',
      content: 'Affirmative. JS is great'
    });
    comment = new Comment({
      content: 'Congrats on new post'
    });
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a relation between a user and a blog post', (done) => {
    User.findOne({name: 'joe'})
      .populate('blogPosts')
      .then((user) => {
        console.log(user);
        done();
      })
  })


});
