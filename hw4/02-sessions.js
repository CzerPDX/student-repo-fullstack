/** 
 * Exercise 02 - Session with Express
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 4
 *
 * References:
**/

const express = require('express');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5001;

// Add your code here

// Use dynamic routing

// Use the express-session module
app.use(
  session({
    secret: 'a secret to sign the cookie',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 86400000,
    },
  })
);

// app.get('/', (req, res) => {
//   // Add your code here
// });

// All Routes!
app.all('*', (req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(200);

  // Every route writes out its path
  res.write(`<h1>Currently on route: ${req.path}</h1>`);

  // If there is no entry for "routeList" in the session
  // console.log(req.session.routeList);
  if (req.session.routeList === undefined) {
    // Write out a welcome message and initialize routeList as an empty array
    res.write(`<h1>Welcome to ${req.headers.host}</h1>`);
    req.session.routeList = [];
  }
  // Otherwise, there is some entry for "routeList" in the session.
  else {
    // Print out the previous routes
    res.write(`<h1>Previously visited:</h1>`);
    req.session.routeList.forEach((routeName) => {
      res.write('<h1>');
      res.write(`&emsp;${routeName}`);
      res.write('</h1>')
    });
  }

  // Add the path to the routeList, but only if it is NOT /favicon.ico
  if (req.path !== '/favicon.ico') {
    req.session.routeList.push(req.path);
  }
  
  res.end();
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
