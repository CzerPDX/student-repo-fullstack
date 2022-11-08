/** 
 * Exercise 03 - Form with express
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 4
 *
 * References:
 * https://stackoverflow.com/questions/44608042/express-static-server-cache-control-with-max-age-0-must-revalidate
**/

const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('', (req, res) => {
  // Add your code here
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
