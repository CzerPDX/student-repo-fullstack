// Catarina Paun's CS 410 Fullstack work with my notes and possible addition/changes

/*
  Previously in 02 we didn't make much use of all the ability to put information into
  the response, so this file shows how you can deliver different pages using the response
  depending on which route the client is requesting.
*/

// Exported and importing characters 
const http = require('http');
const data = require('./characters');
const port = process.env.PORT || 5001;

// Create the correct response depending on what route the client is asking for
// THIS WILL ONLY RETURN SOMETHING IF THE REQUEST IS A 'GET' REQUEST!!!
const server = http.createServer((req, res) => {
  // main/default route. just a slash will give you the root
  if (req.method === 'GET' && req.url === '/') {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello! This is the Main page</h1>');
    res.end();
  }

  // new route --> /about
  else if (req.method === 'GET' && req.url === '/about') {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Keep-Alive': 'timeout=3',
    });
    res.write('<h1>This is the About page</h1>');
    res.end();
  }

  // new route --> /contact
  else if (req.method === 'GET' && req.url === '/contact') {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': ['first=spongebob', 'last=squarepants'],
    });
    res.write('<h1>This is the Contact page</h1>');
    res.end();
  }

  // new route --> /data
  else if (req.method === 'GET' && req.url === '/data') {
    console.log(`${req.method} - ${req.url}`);
    // console.log(characters);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // Stringifies the data so we can see it
    res.write(JSON.stringify(data));
    res.end();
  }

  // new route --> handle 404
  else {
    console.log(`${req.method} - ${req.url}`);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h1>404: Page not found</h1>');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
