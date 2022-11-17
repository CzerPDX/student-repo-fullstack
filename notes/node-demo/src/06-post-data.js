// example adapted from the Nodejs.org docs
const http = require('http');
const port = process.env.PORT || 5001;

// Writing the HTML like this is not recommended, but it is just for example purposes.
// If the form uses "get" instead of "post" for the method the data we are sending will END UP IN THE URL
// Therefore, it is important to make sure to use the post method!!!!!
const postHTML = `<html><head><title>Post Example</title></head><body>
  <form method='post'>
  <label for="name">Name: </label>
  <input type="text" name="name" id="name"><br />
  <label for="email">Email: </label>
  <input type="text" name="email" id="email"><br />
  <input type='submit'>
  </form></body></html>`;

const server = http.createServer((req, res) => {
  let body = '';
  // Below we are waiting on both "data" and "end" for the request
  req.on('data', (chunk) => {
    // Once we have the data it gets added to the body of the request
    body += chunk;
    console.log('on data: ' + body);
  });
  // Once we get the .end() signal then we know we have all the data.
  /*
    Note: when I run this, "on end: " gets printed to the console over and
    over again way more times than the info is submitted. I'm not sure
    why this is happening.
  */
  req.on('end', () => {
    // Once we have all the data we log it to the console
    console.log('on end: ' + body);
    res.writeHead(200);
    // Reposting the HTML effectively resets the input
    res.end(postHTML);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
