# Socket.io Test and Coverage
## Introduction

Writing code testing the interactions of multiple clients for Socket.io quickly leads to a messy nest of connect callbacks and setTimeout calls.  Socket-tester handles all the repetitive boilerplate of setting up client connections, setting up event handlers, and tearing down connections after the tests are run.  Its syntax is flat, concise and easy to use without having to manage nested connect statements. It also includes a number of flexible helper functions that test for the most common use cases.

## Installation

* `git clone <repository-url>` this repository
*  change into the new directory
* `npm cache clean` - [npm cache](https://docs.npmjs.com/cli/cache)(For NPM)
* `npm install`

### Running Tests

* `mocha -R spec test/test.js`

### Running Coverage

* `npm test`
