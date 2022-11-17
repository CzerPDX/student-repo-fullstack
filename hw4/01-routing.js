/** 
 * Exercise 01 - Node Routes with Express
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 4
 *
 * References:
 * https://stackoverflow.com/questions/44608042/express-static-server-cache-control-with-max-age-0-must-revalidate
 * https://www.tutorialspoint.com/expressjs/expressjs_cookies.htm
 * https://www.geeksforgeeks.org/how-to-redirect-404-errors-to-a-page-in-express-js/
**/


const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

const oneDay = 86400;

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// Add your code here

// Welcome route
// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
app.get('/welcome', (req, res) => {
  // Set a response status
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });
  res.send('Hello and welcome!!!');
});

// Redirect and redirected routes
// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
app.get('/redirect', (req, res) => {
  res.redirect(302, '/redirected');
});
app.get('/redirected', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200);
  res.send('You have been redirected!!!');
});

// Cache Route
// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
app.get('/cache', (req, res) => {
  // res.set( 'Cache-Control', `max-age=${oneDay}` );
  res.set({ 
    'Cache-Control': `max-age=${oneDay}`,
    'Content-Type': 'text/html'
  });
  res.status(200);
  res.send('this resource was cached');
});

// Cookie Route
// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
app.get('/cookie', (req, res) => {
  // res.set( 'Cache-Control', `max-age=${oneDay}` );
  res.set({ 'Content-Type': 'text/plain' });
  res.cookie('hello', 'world');
  res.send('cookies… yummm');
});


// 404 Routes
// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
app.all('*', (req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.status(404);
  res.send('404 - page not found');
})



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
