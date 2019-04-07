import React from 'react';
import { PropTypes } from 'prop-types';
import { createIteratorPropType } from './../../lib/custom-proptypes';

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
