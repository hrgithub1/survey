const passport = require('passport'); // THE LIBRARY !!

/**
 * Exporting a function, with the parameter app.
 * The function contains routes, which will be used in the express application
 * in index.js
 */
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // passport automatically attached (amongst) a function to req: logout()
    // logout() takes the cookie and 'removes/kills' the user.id, hence ->
    // the cookie is without user.id -> no user.id to be found
    req.logout();
    res.send(req.user); // is then undefined or empty
  });

  app.get('/api/current_user', (req, res) => {
    // res.send(req.session);

    // console.log('Hello, the current user is: ', req.user);

    res.send(req.user);
  });
};
