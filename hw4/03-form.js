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
app.post('/submit', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/html' });

  // Send out name and email info to page
  // Should not be able to submit form without name and email so no check is needed here
  res.write(`Name: ${req.body.inputName}<br>`);
  res.write(`Email: ${req.body.inputEmail}<br>`);

  // Process feedback input
  if (req.body.inputFeedback === "") {
    res.write(`Comments: n/a`);
  }
  else {
    res.write(`Comments: ${req.body.inputFeedback}`);
  }
  res.write(`<br>`)

  // Process Newsletter selection
  if (req.body.inputNewsletter === undefined) {
    res.write(`Newsletter: No, thank you.`)
  }
  else {
    res.write(`Newsletter: Yes, sign me up for the newsletter.`);
  }
  res.write(`<br>`);

  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
