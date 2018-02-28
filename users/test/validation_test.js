const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user\'s name', (done) => {
    const user = new User({name: undefined});
    const validationResult = user.validateSync(); //sync version of validate() that doesn't need callback
    // console.log(validationResult);
    // const message = validationResult.errors.name.message;
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
    done();
  });

  it('requires the user\'s name to be longer than two characters', (done) => {
    const user = new User({name: 'Al'});
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name; // const message = validationResult.errors.name.message;
    assert(message === 'Name must be longer than two characters.');
    done();
  });

  it('disallows invalid records from being saved', (done) => {
    const user = new User({name: 'Al'});
    user.save()
      .catch((validationResult) => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters.');
        done();
      });
  });
});
