const http = require('http');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  /*
    This would be really error prone to write a whole page this way with res.write()
    But this is a good example of something simple to show how it works.
  */
  // This actually writes to the page once the request is received!
  res.write('<h1>Hello World, Node!</h1>');
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
