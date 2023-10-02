/**
 *
 */
const express = require('express');
const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

const app = express(); // New express application 'app' generated,
// The app-object (exporess server), listens to the port,
// and directs all the incomming requests to the right route-handlers

passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);
// passport, make use of other strategy
// new instance of passport-strategy

/**
 * Directing to google, after a specific route:
 * Involve the passport object as second argument to be handled
 * -route: '/auth/google',
 * -strategy-type: 'google',
 * -object-scope (google defined strings):
 */
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

/**
 * Google has given a code, and with the redirect,
 * google gets a request, with the code in request it just has sent,
 * and now replies with the user-data (profile, email)
 * At that time, the 2nd argument of GoogleStrategy is executed
 */
app.get('/auth/google/callback', passport.authenticate('google'));

// app.get("/", (req, res) => {
//   res.send({ my_name_is: "HansiePansie" });
// });
// app: express app
// get: incoming request with that particular method
// /: a request trying to access the '/'
// req: object that represents the incomming request
// res: object representing the outgoing response
// res.send({a:b}):sending back a JSON object to requestee

/**
 * conventions, user methods:
 * get - get info
 * post - send info
 * put - update entire object/document (all properties)
 * patch - update selected properties
 * delete - delete object/document
 */

/**
 * DYNAMIC PORT BINDING:
 */
const PORT = process.env.PORT || 3000;
// dynamically setting PORT, just before deployment
// here says, look at environment and set PORT to given by HOST
// In dev environment, if no PORT is declared => pick up 3000

app.listen(PORT, () => {
  console.log('server is running');
}); // Instruction of express to node to listen to port 3000
