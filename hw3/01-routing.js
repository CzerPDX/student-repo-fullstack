/** 
 * Exercise 01 - Node Routes 
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 3
 *
 * References:
 * https://stackoverflow.com/questions/34218141/how-to-get-cookies-from-request-module-in-node-js
 * https://stackoverflow.com/questions/7695997/split-the-sentences-by-and-remove-surrounding-spaces
**/


const http = require('http');
const { reset } = require('nodemon');
const port = process.env.PORT || 5001;
const oneDay = 86400;


// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

const findCookie = (req, cookieName) => {
  let cookieValue = null;
  // Only attempt to look for the cookie if there are cookies in the request header
  console.log(req.headers.cookie);
  if (req.headers.cookie) {
    cookieList = req.headers.cookie.split(';').map(function(cookie) { return cookie.trim(); });

    // Go through cookies while there are cookies to go through and we have also not found the target cookie name
    for (let i = 0; (i < cookieList.length) && (cookieValue === null); i++) {
      // Split the cookie at the '='
      const currCookie = cookieList[i].split('=');
      console.log(currCookie);
      // Set cookieName to yes if we found the hello cookie
      if (currCookie[0] === cookieName) {
        cookieValue = currCookie[1];
      }
    }
  }

  return cookieValue;
}

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  // Main page
  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }

  // Welcome Page
  // http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format
  else if (req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome !!!!!</h1>');
    res.end();
  }

  // Redirect page
  // http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
  else if (req.url === '/redirect') {
    res.writeHead(302, { location: '/redirected' });
    res.end();
  }
  // RedirectED page
  else if (req.url === '/redirected') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>You have been redirected !</h1>');
    res.end();
  }

  // Cache page
  // http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day
  else if (req.url === '/cache') {
    res.writeHead(200, { 
      'Content-Type': 'text/html', 
      'Cache-Control': `max-age=${oneDay}`
    });
    res.write(`<h1>this resource was cached</h1>`);
    res.end();
  }

  // Cookie page
  // http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
  else if (req.url === '/cookie') {
    res.writeHead(200, 
      { 
        'Content-Type': 'text/html',
        'Set-Cookie': 'hello=world'
      }
    );
    // res.write(`${req.headers.cookie}`)
    res.write(`cookies... yummm`)
    res.end();
  }

  // Check cookie page
  // http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
  else if (req.url === '/check-cookies') {
    let helloFound = 'no';
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // If the result of findCookie() is not null then set helloFound to yes
    if (findCookie(req, 'hello')) {
        helloFound = 'yes';
    }
    res.write(`${helloFound}`);
    res.end();
  }

  // Handle 404
  // For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format
  else {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>404: Page ${req.url} not found</h1>`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
