/**
 * This file returns credetials depending on DEV or PRod environment
 */

if (process.env.NODE_ENV === 'production') {
  // return PROD set of keys
  module.exports = require('./prod');
} else {
  // return DEV set of keys
  module.exports = require('./dev');
  // Importing the dev-keys
  // and immediately exporting it, so other pieces of code can use it.
}

/**
 * V1:
 * Only one set of keys, however when laptop get stolen (or whatever)
 * the data (keys) become known to third party (easy readable, plain text file)
 * In that case DB or cookies are accessable for third parties !!!
 * ==> Create DEV and PROD keys.
 * The PROD keys are used for the application running at the server (remote)
 * and the DEV keys are not the same... hence a DEV and PROD environment.
 * IT MEANS:
 * 2 different mongoDB's: PROD-DB and DEV-DB
 * 2 different Google-APIs: PROD-Googel-API and DEV-Google-API
 * 2 different CookieKeys: PROD-Cookie-Key and DEV-Cookie-Key
 * :: DO NOT USE REAL DATA in DEV , ONLY ALIKE !!!!
 */

// * Project Survey in MongoDB
// * npm install mongodb
// * username: hrSurvey
// * pw: QFiCw22j81MJXgPu

// Replace <password> with the password for the hrSurvey user.
// Ensure any option params are URL encoded.

// * Project PRODsurveys in MongoDB
// * npm install mongodb
// * username: hrPRODsurvey
// * pw: l7b2j1c6aZnrcGbr
// * mongodb+srv://hrPRODsurvey:l7b2j1c6aZnrcGbr@cluster0.j9r0vwe.mongodb.net/PRODsurveyDB?retryWrites=true&w=majority

// Google:
// Project ID: prod-survey-400805. It cannot be changed later

// Done with local host: !!!! however it becomes the RENDER.COM environment !! - edit or create new !!!
//
// client-id: 470626061080-usfmn2olsqscpql0octpq5ufaafj7lam.apps.googleusercontent.com
// client-secret: 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
//
