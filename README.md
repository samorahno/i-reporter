[![Build Status](https://travis-ci.org/samorahno/i-reporter.svg?branch=develop)](https://travis-ci.org/samorahno/i-reporter) 
[![Coverage Status](https://coveralls.io/repos/github/samorahno/i-reporter/badge.svg?branch=develop)](https://coveralls.io/github/samorahno/i-reporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7d364f5b8d729eed2e56/maintainability)](https://codeclimate.com/github/samorahno/i-reporter/maintainability)

# i-reporter
i-Reporter enables citizens to bring any form of corruption to the notice of appropriate authorities and the general public. Users of the application can also report on things that needs government intervention

# Features
- Users can  create Red-Flags or Intervention records
- Users can view list of Red-Flags records
- Users can edit their red-flag or intervention records
- Users can delete their red-flag or intervention records

# Templates
UI templates are hosted on Github pages [here](https://samorahno.github.io/i-reporter/UI/)

# Techonologies Used
- [Node.js](https://nodejs.org/) - A runtime environment based off of Chrome's V8 Engine for writing Javascript code on the server.
- [Express.js](https://expressjs.com/) - Web framework based on Node.js.
- [Babel](https://babeljs.io/) - Javascript transpiler.
- [Eslint](https://eslint.org/) - Javascript linter.
- [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style [guide](https://github.com/airbnb/javascript) was followed.

# Testing Tools
- [Mocha](https://mochajs.org/) - A Javascript test framework.
- [Chai](http://chaijs.com/) - Assertion library.

# Installation
- Install [NodeJs](https://nodejs.org/en/download/).
- Clone this repository using git clone ```https://github.com/samorahno/i-reporter.git``` .
- Run ```npm install``` to install all dependencies.
- Run ```npm start``` to start the server.
- Navigate to ```localhost:3000/api/v1``` in your browser to access the application.

# Tests
- The tests were written using Mocha and Mocha-http
- To run tests, navigate to the project's root directory
- After installation, the following command - ```npm run test```

# Author
- Abosede Samson Olawale