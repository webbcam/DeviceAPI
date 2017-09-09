var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
SALT_WORK_FACTOR = 12;
const uniqid = require('uniqid');

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  admin:    { type: Boolean, required: true },
  dbID:     { type: String, unique: true} 
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified
  if (!user.isModified('password')) return next();

  // generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the plain text password with the hashed one
      user.password = hash;

      next();
    });
  });
});

/**** INSTANCE METHODS ****/
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
    .then(function(result) {
      console.log('Password check: ' + (result ? 'passed' : 'failed'));
      return result;
    })
    .catch(function(err) {
      console.log("comparePassword: " + err.message);
      throw new Error(err.message);
    });
};

UserSchema.methods.addMember = function(username, password) {
  var user = this.model('User')({
    username: username,
    password: password,
    admin: false,
    dbID: this.dbID
  });

  return user.save();
}

UserSchema.methods.deleteMember = function(username) {
  return this.model('User').findOneAndRemove({username: username, dbID: this.dbID})
    .then(function(result) {
      if (result == null) throw new Error("user does not exist");
      return Promise.resolve(result);
  });
}

UserSchema.methods.getMember = function(username) {
  // If no user specified, return all users on account
  if (!username) {
    return this.model('User').find({dbID: this.dbID}, function(err, results) {
      if (err) throw new Error(err.message);
      if (results.len === 0) throw new Error("user does not exist");
      return Promise.resolve(results);
    });
  } else {
    return this.model('User').find({username: username, dbID: this.dbID},
      function(err, results) {
      if (err) throw new Error(err.message);
      if (results.len === 0) throw new Error("user does not exist");
      return Promise.resolve(results);
    });
  }
}

UserSchema.methods.updatePassword = function(password) {
  this.password = password;
  return this.save();
}

/**** STATIC FUNCTIONS ****/
UserSchema.statics.getUser = function(username) {
  return this.findOne({username: username})
    .then(function(user) {
      if (user == null) throw new Error('user does not exist');
      return Promise.resolve(user);
    });
}

UserSchema.statics.validateUser = function(username, password) {
  return this.findOne({ username: username })
    .then(function(user) {
      if (user == null) throw new Error('user does not exist');

      return user.comparePassword(password)
        //  Success
        .then(function(result) {
          console.log('ComparePassword result: ' + result);
          if (!result) throw new Error('password incorrect');

          return Promise.resolve(user);
          //return Promise.resolve({ _id: user._id, username: user.username, dbID: user.dbID });
        });
    });
}

UserSchema.statics.createUser = function(username, password, admin, dbID) {
  var user = this({
    username: username,
    password: password,
    admin: admin,
    dbID: dbID
  });
  return user.save();
}

UserSchema.statics.deleteUser = function(username) {
  return this.deleteOne({username: username});
}

module.exports = mongoose.model('User', UserSchema, 'users');
