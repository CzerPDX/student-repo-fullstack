/** 
 * Exercise 03 - form 
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 3
**/

const http = require('http');
const static = require('node-static');
const querystring = require('node:querystring');
const port = process.env.PORT || 5001;

const file = new static.Server('./public');

const server = http.createServer((req, res) => {
  const routes = [
    '/form',
    '/submit',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }


  // Form route
  // http://localhost:5001/form should return a form with input elements for username, email, and submit button
  if (req.method === 'GET' && req.url === '/form') {
    file.serveFile('/form.html', 200, {}, req, res);
  }

  // Submit route
  // http://localhost:5001/submit should return all the data the user entered
  else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    // Add data 
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const userdata = querystring.parse(body);
      const { username, email } = userdata;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<p>username: ${username}</p>`);
      res.write(`<p>email: ${email}</p>`);
      res.end();
    });
  }

});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
