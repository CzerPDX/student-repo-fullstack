const http = require('http');
const fs = require('fs');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  // This is a simplified version but usually we would want error handling around
  // createReadStream() and createWriteStream() below.
  const readable = fs.createReadStream('src/lorem.txt');
  // Writes it out to a file
  const writeable = fs.createWriteStream('src/out.txt');
  // We can also pipe the data to different places in our application including to different
  // routes if we wanted to.
  readable.pipe(writeable);
  readable.pipe(res);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
