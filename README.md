# json2kv

Dependencyless JS library that converts a generic JSON-like object to a map-like, key-value object.

--------------------------------

[![Travis](https://img.shields.io/travis/jkomyno/json2kv.svg)](https://travis-ci.org/jkomyno/json2kv)
[![npm](https://img.shields.io/npm/v/json2kv.svg)](https://npmjs.com/package/json2kv)
[![npm](https://img.shields.io/npm/dm/json2kv.svg)](https://npmjs.com/package/json2kv)
[![codecov](https://codecov.io/gh/jkomyno/json2kv/branch/master/graph/badge.svg)](https://codecov.io/gh/jkomyno/json2kv)  

- [Overview](#overview)
- [Installation](#installation)
- [Motivation](#motivation)
- [Usage](#usage)
- [Contributing](#contributing)
  - [Development Scripts](#development-scripts)
  - [Build Note](#build-note)
- [Credits](#credits)
- [License](#license)

## Overview

**json2kv** is a library that converts a generic JSON to a map-like, key-value object. All it needs is a JSON-ish datum
(that is, either a real JSON file or a JS serializable Object), and a property name.
User defined exceptions are supported too.
At the moment, only a property from the immediate children is supported.

It is fully tested, with 100% coverage.

## Installation

With yarn:

- `yarn add json2kv`

Or, with npm:

- `npm i -S json2kv`

## Motivation

The foundations of this library have been laid on StackOverflow, after I've managed to provide [a meaningful answer](map given the 'value' property of all the nested objects) to this problem: create a key-value object given a JSON and a certain property, which is common among some of the nested objects.
In other words, the problem this package solves is converting a JSON to a map structure (key-value object), filtering out the unnecessary props.
Hence the name json2kv.

## Usage

```javascript
// import the library
import json2kv from 'json2kv';

// define the JSON-like data
const data = {
  some: 'string',
  someObjWithoutValueProp: {
    yep: 'nope'
  },
  battery: {
    value: 4.08,
    metadata: {
      // ...
    }
  },
  location: {
    value: {
      coordinates: 'Some location value'
    }
  },
  temperature: {
    value: 32.5,
    metadata: {
      // ...
    }
  }
};

const prop = 'value';
const result = json2kv(data, prop);

console.log(result);
/*
  {
    battery: 4.08,                         // value of data.battery.value 
    location: {                            // value of data.location.value
      coordinates: 'Some location value',
    },
    temperature: 32.5,                     // value of data.temperature.value
  }
*/
```

You can also define custom exceptions to override the behaviour for specific properties.
To do you you need to define a Map<string, string>, having a child property of data as key
(in this case, `location`, as in `data.location`), and the object path of the desired
mapping as value (in this case, `value.coordinates`, as in `data.location.value.coordinates`).

```javascript
const exceptions = new Map(); // Map<string, string>
exceptions.set('location', 'value.coordinates');
const resultWithExceptions = json2kv(data, prop, exceptions);

console.log(resultWithExceptions);
/*
  {
    battery: 4.08,                    // value of data.battery.value 
    location: 'Some location value',  // value of data.location.value.coordinates
    temperature: 32.5                 // value of data.temperature.value
  }
*/
```

## Contributing

As always, contributions are always welcome, and remember:

-   ⇄ Pull requests and ★ Stars are really welcome too.
-   Just check out the dev scripts right below to get started.

### Development scripts

#### `flow`

> checks if Flow definitions are written properly

#### `lint`

> checks if code conforms to linting rules (eslint)

-   `lint` - will check js

-   `lint --fix` - will automatically fix js

#### `publish`

> Runs all the linting/test suites
> Creates a brand new build
> Pushes a release to npm

#### `test`

> checks if all unit tests pass (jest)

-   `test:watch` - run tests in watch-mode
-   `test:cov` - run tests and displays coverage (which should't get below 100%!)
-   `test:ci` - run global tests and checks, including linting and flow errors

### Build note

You can build your own light version of setting the env.targets property in .babelrc to `"node": "current"`.
The version deployed to npm requires at least NodeJS 6.0.0.

## Credits

This library is a fork of another project of mine, [node-lib-boilerplate](https://github.com/jkomyno/node-lib-boilerplate).

## License

This project is [MIT](LICENSE) licensed.
