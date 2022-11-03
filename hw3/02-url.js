/** 
 * Exercise 02 - urls 
 * Brooke Czerwinski
 * Full-Stack Web Development
 * HW 3
 *
 * References:
 * https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/forEach
 * https://www.javascripttutorial.net/dom/css/add-styles-to-an-element/
**/


const { table } = require('console');
const http = require('http');
const urls = require('url');
const port = process.env.PORT || 5001;

const buildQueryTable = (url) => {
  // Build a table to hold the query information
  let queryTable = `<table style="border: 1px solid;">`;
  // Build a table row for each key/value pair
  url.searchParams.forEach((value, key) => {
    queryTable += `<tr style="border: 1px solid;">`;
    queryTable += `<td style="border: 1px solid;">${key}</td>`
    queryTable += `<td style="border: 1px solid;">${value}</td>`
    queryTable += `</tr>`;
  });
  // Close the table
  queryTable += `</table>`;
  
  return queryTable;
}

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

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

  // Add your code here

  // All paths besides root will take you here to process all query data
  else {
    const attributeTable = buildQueryTable(url);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`${attributeTable}`);
    res.end();
  }

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
