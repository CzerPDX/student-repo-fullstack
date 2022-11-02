// Notes from Catarina Paun's class

// This means we will be requiring that requests come in over hyper text transfer protocol!
// This is the CommonJS import below. The name of the module is "http"
const http = require('http');
// We will be using 5001 as our port to view our output from (localhost:5001 will be running after we run the script)
const port = 5001;

// create the server object using the Node.js built-in "http" module 
/*
    We take in the request and the response as arguments
    Request:    The request we get from the client
    Response:   The response we send back to the client

    Below we give a 200-type response back containing the text "Hello World, Node!"
    Header:     Included in the header is the code for the response (200, which means success)
                and a description of the type of content being returned in the response (which
                is text/plain)
    Content:    The text reply 'Hello World, Node!'
                NOTE: Content could be more than just text. Sometimes it could be a file like
                an entire other page (think like routes)
    end:        Gives an end to the response. Without it the page will basically load forever
                because it thinks that it's still waiting to receive information
*/
const server = http.createServer((req, res) => {
  // set the response status and the response headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // write a response to the client
  res.write('Hello World, Node!');

  // end the response
  res.end();
});

// Creating a server on its own is not sufficient. We also have to listen on a port 
/*
  Creates a listener on the port given as an argument.

  According to AWS:
  "A listener is a process that checks for connection requests, using the protocol 
  and port that you configure."

  According to Oracle:
  "The listener is a separate process that runs on the database server computer. It 
  receives incoming client connection requests and manages the traffic of these requests 
  to the database server."
*/
// set the server to listen to localhost on port 5001.
const hostname = 'localhost';
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
