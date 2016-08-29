import React, { PropTypes } from 'react';
import { createIteratorPropType } from './../../lib/custom-proptypes';

const TweetFeed = props => (
  props.tweets.map(tweet =>
    <div>{tweet}</div>
  )
);

TweetFeed.propTypes = {
  tweets: PropTypes.arrayOf(createIteratorPropType(
    prop => typeof prop === 'string' && prop.length < 140
  ))
};

export default TweetFeed;
