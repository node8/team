var mongoose = require('mongoose'),
  encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
  username: { type: String, require: '{PATH} is required', unique: true },
  firstName: { type: String, require: '{PATH} is required' },
  lastName: { type: String, require: '{PATH} is required' },
  salt: String,
  hashPass: String,
  roles: [String],
  profilePicture: String,
  email: {type: String, validate: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/}
});

userSchema.method({
  validPassword: function(password) {
    if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
      return true;
    }
    else {
      return false;
    }
  }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
  User.find({}).exec(function(err, collection) {
    if (err) {
      console.log('Cannot find users: ' + err);
      return;
    }

    if (collection.length === 0) {
      var salt;
      var hashedPwd;

      salt = encryption.generateSalt();
      hashedPwd = encryption.generateHashedPassword(salt, 'admin');
      User.create({username: 'admin', firstName: 'admin', lastName: 'admin', salt: salt, hashPass: hashedPwd, roles: ['admin']});
      console.log('Users added to database...');
    }
  });
};
