/**
 * The execution of a passport Oauth Strategy -Google-.
 * For this, 2 passport libraries are imported:
 * https://www.passportjs.org
 * https://www.passportjs.org/packages/passport-google-oauth20/
 * Getting the keys (or search internet -how to....-):
 * https://www.udemy.com/course/node-with-react-fullstack-web-development/learn/lecture/19049632#content
 */
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/User');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

// In here passing through a callback function, into the seriazlizeUser function of passport!
// arguments are the: currentUser that has retrieved from db OR just created.... (in if/else)
// serialize is sort of encrypt ??
/**
 * user.id will be set into a cookie
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
  // done() is a sort default telling passport the actions are finished for that function
  // Expecting no errors -> null, user.id from MongoDB
});

/**
 * Getting id from cookie....
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then((retrievedUser) => {
    done(null, retrievedUser);
  });
});

passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('profile ', profile);
      // next is returning a promise, takes time, so... adding .then
      // with another callback, where the existingUser (result from User.findOne(..))
      // is 'tested' for found/not found.
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (!existingUser) {
          // saving returns also promise....
          new User({ googleId: profile.id }).save().then((newUser) => {
            done(null, newUser);
          });
        } else {
          console.log('There is already a user with that googleID !!');
          // To tell passport, that the end of auth is comming,
          // the function done(err-obj, user-obj) is executed.
          // No error is sent in this part of if-else:
          done(null, existingUser);
        }
      });
    }
  )
);
