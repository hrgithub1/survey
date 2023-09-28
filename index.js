/**
 *
 */
const express = require("express");

const app = express(); // New express application 'app' generated,
// The app-object (exporess server), listens to the port,
// and directs all the incomming requests to the right route-handlers

app.get("/", (req, res) => {
  res.send({ hoi: "there" });
});

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

app.listen(PORT); // Instruction of express to node to listen to port 3000
