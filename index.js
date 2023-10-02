/**
 * Initial application set-up
 */
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// Version @0.5 is used !! higher version has :
//  TypeError: req.session.regenerate is not a function
const express = require('express');
const keys = require('./config/keys');
// require('./models/User');
// BEFORE the executing the passport function in passport.js,
// de User Model must be known (because it is used in passport.js)
require('./services/passport');
// passport.js is NOT exporting anything, just executing some code.
// so, requiring only, is enough
const authRoutes = require('./routes/authRoutes');

// connecting to cloud DB (Atlas)
mongoose.connect(keys.mongoURI);

// creating express application
const app = express();

// Enabling express the use of cookies - with its session options
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // In millisec, 30 days
    keys: [keys.cookieKey],
  })
);
// Enabling passport to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

// authRoutes is a function, with an immediate callback-function with the app-object
// in there, all the routes for authentication are defined
authRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('server is running');
});

/**
 * HTTP REQUESTS ARE STATELESS:
 * - each request between browser and server (..and others?) do not know from each other
 * - once a request, because NOTHING is kept, a next request is like a blanc to the server/browser
 * - NO information is kept (for that request) on server -> without a state
 * AUTHENTICATION:
 * - first request (login), handover email + pw,
 * - server/db checks, the two (or 2-way) are ok, then allows access
 * - PLUS sends a TOKEN to requestee
 * SECOND/ETC.. REQUEST:
 * - request INCLUDES TOKEN, so server assumes correct requestee
 * HOW?:
 * - initial request -> get ok from server -> token created
 * - answering request includes (in header) token
 * - browser strips header, saves token in browser memory (where?),
 * - in future, any request is appended with token automatically, by the browser
 * -
 *
 * THIS IS A : COOKIE BASED AUTHENTICATION
 *
 * ALTERNATIVES:
 * - Json Webbased Token (JWT)
 * - other Token Based Strategies.....
 */

/**
 * 3rd PARTY AUTHENTICATION:
 * - try to look for the user-ID
 * - not email, which could be changed over time
 * - perhaps as a double check...
 *
 */

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
