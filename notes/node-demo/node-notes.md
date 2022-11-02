All notes are taken during Catarina Paun's CS 410 Fullstack class at PSU

---

Almost anything we can write in Javascript we can write in Node with some exceptions. Anything that uses the browser API is not going to be accessible using Node because we aren't using the browser.

An example of this is the DOM because the document object model is the browser, so we won't have access to that with Node. We can access it with JS inside the browser because we are running it in the browser, but Node runs outside a browser so it doesn't have access to the browser API.

Built-in node modules

* http: create a web server
* url: split up a web address into readable parts
* path: file and directory paths
* os: information about the current os
* fs: work with the file system

## NPM (Node.js package manager)

### Third-party packages

* Third-party packages are tracked in **package.json**

  * This file also includes project information and is structured in JSON format

  Create a package.json file with:

  ```bash
  npm init          # generates package.json with question prompts
  ```

  ```bash
  npm init --yes    # generates package.json with defaults
  ```

Output using defaults using --yes:

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

#### Different ways to install third-party packages

(express and mocha are used as examples below)

> npm install [package name]        # install local package

> npm install express               # install local package

> npm i express                     # install local package - shorthand

> npm i -g express                  # install global package

> npm i --save express              # install and save as a dependency

> npm i --save-dev mocha            # install and save as a dev dependency

> npm i moment lodash body-parser   # install multiple packages

#### Different ways to manage third-party packages

> npm uninstall [package]          # uninstall local package

> npm update              # update local packages

> npm audit               # see a list of vulnerabilities

> npm audit fix           # fix vulnerabilities

> npm list                # list of local packages

> npm list --depth=0      # list of local packages

> npm list -g             # list of global packages

> npm list -g --depth=0   # list of global packages

#### Dependencies

```json
{
  "name": "node-hello-world",
  "version": "1.0.0",
  "description": "This is a hello world project in Node.js",
  ...
  "author": "Caterina Paun",
  "license": "MIT",
  "devDependencies": {
    "mocha": "^7.0.1",
    "nodemon": "^2.0.20"
  },
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

The above shows the devDependencies (which here is listed as mocha 7.0.1) and regular dependencies (which here is listed as express 4.17.1)

*NOTE: using the carat ^ before the version means that other versions can be used, too. Any other MINOR RELEASE version can be used*

* Dev Dependencies:
  * Needed ONLY when developing the application. Not needed to run the application.
    * EXAMPLES
      * Mocha: An example here might be using Mocha for testing. You would need it when you're running tests during development, but the user won't need it because they don't do the software testing.
      * Nodemon: Usually you have to stop and restart a server every time a change is made, but with nodemon that process happens automatically.
* Regular Dependencies:
  * Needed when running the application not just when developing

The entire structure of dependencies are available within the node_modules folder which gets installed when you use npm install

##### Gitignore:

You will always want to ignore your node_modules folder because they can be rebuilt so we don't need to copy them around.

#### package-lock.json

* npm 5 introduced the package-lock.json file, which keeps track of the exact version of every package and dependency.
  * Projects can be reproduced 100%, even if the packages have changed.
  * Includes teh dependencies of dependencies.
* The package-lock.json file should be tracked via Git.
  * Running `npm install` will install dependencies in the `node_modules/` folder.
  * It is good practice to add the `node_modules/` folder to the `.gitignore` file.

#### Semantic Versioning

![](assets/20221101_161552_image.png)

Above gives guidelines on semantic versioning.

![](assets/20221101_161629_image.png)

![](assets/20221101_161643_image.png)

#### Running tasks with npm

* In package.json, we can specify various command line tasks that can be executed

> npm [taskname]

or

> npm run [taskname]

* This is best used for commands that might be long and/or easy to mistype.

Below you can see an example of implementing scripts with node like `start` and `dev` that will run when you use `npm start` or `npm dev`

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "main": "isrc/server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^7.0.1"
  }
}
```

*It's highly recommended to have a `start` included so that developers can just run `npm start`. It will often be assumed to be included. `index.js` was moved to /src and the package.json file was edited to add start command which can be run using `npm start` or `npm run start`. Also created added a `dev` command which will run the application using node mon (node mon will leave the server up but automatically refresh the contents when the file contents change). The dev version can be run using `npm run dev`. It does not seem to be able to run for me using just `npm dev`, however.*

* npx is a powerful command that was introduced in npm 5.2 to execute packages.
* We can run a command without installing anything first and we can select versions of the package using @version.
  * Not all packages need to be installed
  * i.e. `npx create-react-app my-react-appx`

Npx is really useful because sometimes you dont need a full package. With npx you can just execute it with the parts you need.

## Yarn

* Yarn is an alternative to npx; also uses the npm registry.
  * Yarn used to be more popular than npx because it was a little faster, but they're about the same speed now.
  * Yarn caches every package it downloads and it offers parallel download for packages which is important for when you use large packages or lots of different dependencies that you need to get installed quickly.
  * Both yarn and npx use the npm registry, so they're still the same generally underneath.
* It also generates a yarn.lock and package.json file

## Nodemon

* When workign with a server script, any changes we make require that we stop and restart the server to see the changes.
* The nodemon package automatically restarts the server script whenever there are changes.

See example below `package.json` file that incorporates nodemon:

```json
{
  "name": "node-hello-world",
  "version": "1.0.0",
  "description": "This is a hello world project in Node.js",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "author": "Caterina Paun",
  "license": "MIT",
  "devDependencies": {
    "nodemon": "^7.0.1"
  }
}
```

## Node.js Debugger

Since we don't use the browser API with node, we won't be able to see `console.log()` statements in the browser console. Now we need to open up a Node.js tab in our dev tools. We can do that by adding the `--inspect` or `--inspect-brk` flags when we run our application.

* There is a debugging client in Chrome DevTools and VS Code.
* Use the inspect flag to open a connection for debugging.

> node --inspect index.js

> node --inspect-brk index.js

# Modules

The CommonJS module specification is the standard used in npm for working with modules (as opposed to ES6 modules, which are used in the browser).

Built-in module system is accessible through the `modules.exports` API.

"Modules" and "packages" are often referred to interchangably. They are very similar but there are some differences between them.

We have ES6 modules in the browser, so if we see those imported somewhere (like in React) there will be like `import React from React` in React. The first `React` is the name of the import (where is it coming from) and the second one is the name of the dependency (which also happens to be `React` here).

On the backend we will do the CommonJS module which will be a bit different. We're going to use `require` rather than `import` and then the name of the dependency where it's coming from.

#### Export the character.js

Define it in something like `character.js`

```javascript
// character.js
const character = {
first: 'Leia',
last: 'Organa'
}

module.exports = character;
```

Then you can use it elsewhere by importing it with `require` (example in a hypothetical `index.js` is displayed below)

```javascript
// index.js
// import the charcter file using "require"
const character = require('./character');
```

We also could do various different named exports as well. We could set up individual variable object for each one of those (such as Luke and Han, etc).

## Setting Up a Server with Node.js

Most of the time when we are working with Node we will want to set up a server to work with it. So that's provided by the Node developers.

* We can create a server with the built-in `http` module.
  * The `createServer()` method creates a new HTTP server, which is set to listen on the specified port and hostname. When we are testing we can use localhost but we will replace this with a real hostname once we go live.
  * The `callback` then executes and the server is ready, meaning the server is running.
* Whenever a new request is received from the client, the request event is called, which proides two objects:
  * A request object -> http.incomingMessage
  * A response object -> http.serverResponse

**An example of a server is available by running `npm run server-dev` or `npm run server-start` in the `node-demo` folder.**

*NOTE! Though `port 5000` is used in some of the examples throughout these notes, that's because they come from some outdated material. Port 5000 is now used by OSX system and so should not be used. It is no longer an open port*

## Routing Requests

* Routing defines what data is served at different endpoints.
  * We serve different information to the client based on which route we're on.
  * An example of different endpoints is typing in `pdx.edu` and `pdx.edu/computer-science`. These are both different routes with two different endpoints.
  * Applications can have different endpoints which can be used, for example, to allow access via different protocols such as SSH and HTTP
* The request argument has a URL property (`request.url`) as well as many other properties that we can use to define routes.

##### src/03-routing.js will contain examples of routing


## Reading from a file

* To read a file in Node.js we can use another built-in module, the `fs` module and the `readFile()` method. This will read the file into memory.
  * The default encoding is utf8
  * `fs` will be our default way to access the file system.
* We can use the same module to write, append, update, rename, or delete files.

##### src/04-buffer-data.js will contain an example of buffering.


## Streams

* Streams are one of the fundamental concepts of Node.js. They are used to handle reading/writing files, network communications, and more.
  * Node is single-threaded, so when we are working with a larger amount of data it won't be feasible to read and process all that data all at once. Waiting for the data to be read and processed can create a bottleneck.
* Typically, a file is read into memory from start to finish, but with streams it can be read and processed piece by piece.
  * **Memory efficiency** -> We can start processing a part of a file before the full file is loaded into memory.
    * Maybe we can use part of that info before the rest of it is completed? For example we could display the results that we have processed out to the user as they complete!
  * **Time efficiency** -> Takes less time to start processing data.

So, how does it work? We use the `fs` module again here. We use `createReadStream()` and `createWriteStream()`

##### src/05-streams.js will contain an example of streaming.


## Event Loops

* JavaScript and Node.js are single-threaded, and ipmlement asynchronous and non-blocking behavior, including events and callbacks.

  * From [https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/https:/)

    > **Blocking** is when the execution of additional JavaScript in the Node.js process must wait until a non-JavaScript operation completes. This happens because the event loop is unable to continue running JavaScript while a **blocking** operation is occurring.
    >
    > In Node.js, JavaScript that exhibits poor performance due to being CPU intensive rather than waiting on a non-JavaScript operation, such as I/O, isn't typically referred to as **blocking** . Synchronous methods in the Node.js standard library that use libuv are the most commonly used **blocking** operations. Native modules may also have **blocking** methods.
    >
    > All of the I/O methods in the Node.js standard library provide asynchronous versions, which are **non-blocking** , and accept callback functions. Some methods also have **blocking** counterparts, which have names that end with `Sync`.
    >
    > Blocking methods execute synchronously while non-blocking methods execute asynchronously.
    >
* The event loop polls for different events. When those events happen, the event handler (a callback function) is invoked.

  * From [https://nodejs.org/es/docs/guides/event-loop-timers-and-nexttick/](https://nodejs.org/es/docs/guides/event-loop-timers-and-nexttick/https:/)

    > #### What is the Event Loop?
    >
    > The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.
    >
    > #### Event Loop Explained
    >
    > When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the [REPL](https://nodejs.org/api/repl.html#repl_repl), which is not covered in this document) which may make async API calls, schedule timers, or call `process.nextTick()`, then begins processing the event loop.
    >
    > The following diagram shows a simplified overview of the event loop's order of operations:
    >
    > ```sql
    >    ┌───────────────────────────┐
    > ┌─>│           timers          │
    > │  └─────────────┬─────────────┘
    > │  ┌─────────────┴─────────────┐
    > │  │     pending callbacks     │
    > │  └─────────────┬─────────────┘
    > │  ┌─────────────┴─────────────┐
    > │  │       idle, prepare       │
    > │  └─────────────┬─────────────┘      ┌───────────────┐
    > │  ┌─────────────┴─────────────┐      │   incoming:   │
    > │  │           poll            │<─────┤  connections, │
    > │  └─────────────┬─────────────┘      │   data, etc.  │
    > │  ┌─────────────┴─────────────┐      └───────────────┘
    > │  │           check           │
    > │  └─────────────┬─────────────┘
    > │  ┌─────────────┴─────────────┐
    > └──┤      close callbacks      │
    >    └───────────────────────────┘
    > ```
    > *note: each box will be referred to as a "phase" of the event loop.
    >
    > #### Phases Overview
    >
    > * **timers** : this phase executes callbacks scheduled by `setTimeout()` and `setInterval()`.
    > * **pending callbacks** : executes I/O callbacks deferred to the next loop iteration.
    > * **idle, prepare** : only used internally.
    > * **poll** : retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and `setImmediate()`); node will block here when appropriate.
    > * **check** : `setImmediate()` callbacks are invoked here.
    > * **close callbacks** : some close callbacks, e.g. `socket.on('close', ...)`.
    >
* Certain objects (emitters) can emit named events that cause function objects (listeners) to be called.

  * Example: A stream emits an event whenever data is available to be read.
  * From [https://nodejs.dev/en/learn/the-nodejs-event-emitter/](https://nodejs.dev/en/learn/the-nodejs-event-emitter/https:/)

    > If you worked with JavaScript in the browser, you know how much of the interaction of the user is handled through events: mouse clicks, keyboard button presses, reacting to mouse movements, and so on.
    >
    > On the backend side, Node.js offers us the option to build a similar system using the [`events` module](https://nodejs.org/api/events.html).
    >
    > This module, in particular, offers the `EventEmitter` class, which we'll use to handle our events.
    >
