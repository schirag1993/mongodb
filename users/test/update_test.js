const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name:'Joe', likes: 0});
    joe.save()
      .then(() => done())
  });

  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'alex');
      done();
    });
  }

  it('instance type using set and save', (done) => {
    joe.set({name:'alex'}); //calling set does not mean changes will be reflected in db; function makes a change in memory only
    assertName(joe.save(), done)

  });

  it('a model instance can update', (done) => {
    assertName(joe.update({name:'alex'}), done);
  });

  it('a model class can update', (done) => {
    assertName(
      User.update({name:'Joe'}, {name:'alex'}), //update all records with name Joe
      done);
  });

  it('a model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({name:'Joe'}, {name:'alex'}),
      done);
  });

  it('a model class can find a record with an ID and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, {name:'alex'}),
      done);
  });

  it('A user can have their like count incremented by ten', (done) => { //xit means omit test during run
    // User.update({name: 'Joe'}, {postCount: 1}); Note: This is wrong; this line will update the post count to one; not increment it by one
    User.update({name: 'Joe'}, {$inc: {likes: 10}})
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.likes === 10);
        done();
      })
  });


});
