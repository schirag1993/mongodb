const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() { //Note the significance of "function() {}" over "() => {}"; this is because the model instance (UserSchema) is available as "this"
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  //this === 'joe' // only in this scenario because we use joe as the user to save/remove/edit
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id : { $in: this.blogPosts } })
  .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
