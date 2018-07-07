# react-custom-proptypes
[![Build Status](https://travis-ci.org/jackrzhang/react-custom-proptypes.svg?branch=master)](https://travis-ci.org/jackrzhang/react-custom-proptypes)
[![dependencies Status](https://david-dm.org/jackrzhang/react-custom-proptypes/status.svg)](https://david-dm.org/jackrzhang/react-custom-proptypes)
[![npm](https://img.shields.io/npm/v/react-custom-proptypes.svg)](https://www.npmjs.com/package/react-custom-proptypes)

React Custom PropTypes exposes a simple API for creating **precisely defined**, **dependency-free**, and **chainable** React PropType validators.

Check out the [examples](https://github.com/jackrzhang/react-custom-proptypes/blob/master/examples) for various use cases.

## Installation
```sh
$ npm install react react-dom react-custom-proptypes --save
```

## createPropType
### Syntax
```
createPropType(callback[, description])
```

### Parameters
##### `callback` : function
Function that returns a boolean representing the validation of the proptype, taking a single argument: `prop`, the value of the prop

##### `description` : string
Optional. Use this value to specify a helpful description.

### Usage
```jsx
import React from 'react';
import { createPropType } from 'react-custom-proptypes';

const Card = props => (
  <div>
    <div>{props.suit}</div>
    <div>{props.value}</div>
  </div>
);

const suitPropType = createPropType(
  prop =>
    prop === 'spades' ||
    prop === 'hearts' ||
    prop === 'diamonds' ||
    prop === 'clubs',
  'Must be `spades`, `hearts`, `diamonds`, or `clubs`.'
);

const valuePropType = createPropType(
  prop =>
    Number.isInteger(prop) &&
    prop >= 1 &&
    prop <= 12,
  'Must be an integer from 1 - 12.'
);

Card.propTypes = {
  suit: suitPropType.isRequired,
  value: valuePropType.isRequired
};

export default Card;
```

## createIteratorPropType
### Syntax
```
createIteratorPropType(callback[, description])
```

### Parameters
##### `callback` : function
Function that returns a boolean representing the validation of the proptype, taking two arguments: 
 * `prop` - the value of the prop
 * `key` - the key of the current element being processed in the iterable object.

##### `description` : string
Optional. Use this value to specify a helpful description.

### Usage
```jsx
import React, { PropTypes } from 'react';
import { createIteratorPropType } from 'react-custom-proptypes';

const TweetFeed = props => (
  <div>
    {props.tweets.map((tweet, index) => (
      <div key={index}>{tweet}</div>
    ))}
  </div>
);

TweetFeed.propTypes = {
  tweets: PropTypes.arrayOf(createIteratorPropType(
    prop => typeof prop === 'string' && prop.length < 140
  )).isRequired
};

export default TweetFeed;
```

## Contributing
Issues and pull requests are welcome.
```sh
$ git clone https://github.com/jackrzhang/react-custom-proptypes
$ cd react-custom-proptypes
$ npm install
```

**Please run linting and tests prior to commits.**
```sh
$ npm run lint
$ npm test
```

## License
[MIT](https://github.com/jackrzhang/react-custom-proptypes/blob/master/LICENSE)
