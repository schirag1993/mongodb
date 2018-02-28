const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{title: 'PostTitle'}]
    });
    joe.save()
      .then(() => User.findOne({name: 'joe'}))
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });
  });
});

//Write test and then modify code => test driven approach
