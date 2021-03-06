// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

// create a schema
var userSchema = new Schema({
  username: { type: String},
  email: {type: String, required:  [true, 'Email is required'], unique:  [true, 'Email is required'], },
  password: { type: String, required: true },
});






userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// userSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// // checking if password is valid
// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.local.password);
// };
// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


// the schema is useless so far
// we need to create a model using it

var Users = mongoose.model('Users', userSchema);

// make this available to our users in our Node applications
module.exports = Users;



