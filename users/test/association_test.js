const mongoose = require('mongoose');
const assert = require('assert');

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

  it('saves a full relation graph', (done) => {
    User.findOne({name: 'joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'JS is good');
        assert(user.blogPosts[0].comments[0].content === 'Congrats on new post');
        assert(user.blogPosts[0].comments[0].user.name === 'joe');
        done();
      });
  });

  it('saves a relation between a user and a blog post', (done) => {
    User.findOne({name: 'joe'})
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is good')
        done();
      });

    // it('saves a full relation graph', (done) => {
    //   User.findOne({name: 'joe'})
    //     .populate({
    //       path: 'blogPosts',
    //       populate: {
    //         path: 'comments',
    //         model: 'comment'
    //       }
    //     })
    //     .then((user) => {
    //       console.log(user);
    //       done();
    //     });
    // });
  });
});
