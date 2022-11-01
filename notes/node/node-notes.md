Almost anything we can write in Javascript we can write in Node with some exceptions. Anything that uses the browser API is not going to be accessible using Node because we aren't using the browser. An example of this is the DOM because the document object model is the browser, so we won't have access to that with Node. We can access it with JS inside the browser because we are running it in the browser, but Node runs outside a browser so it doesn't have access to the browser API.

Built-in node modules

* http: create a web server
* url: split up a web address into readable parts
* path: file and directory paths
* os: information about the current os
* fs: work with the file system
