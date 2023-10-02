const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: {
    type: String,
    required: [true, 'Must have an id from google !'],
  },
});

/**
 * As would be done... and in the file that needs the User Model:
 * const User = require('./models/User.js');
 */

const User = mongoose.model('User', userSchema);
module.exports = User;

/**
 * HOWEVER: when testing wit jest of mocha:
 * With require, the testing envrironment COULD complain
 * about: reloading the requiring of the User Model:
 * alternative approach:
 */

// mongoose.model('User', userSchema);
/**
 * = creating the model (2 arguments), by trying to load something into mongoose
 * In the file, the User Model is needed:
 * const mongoose = require('mongoose');
 * const User = mongoose.model('User);
 * = (1 argument) trying to fetch something out mongoose
 */
