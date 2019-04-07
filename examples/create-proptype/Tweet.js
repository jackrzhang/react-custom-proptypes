import React from 'react';
import { createPropType } from '../../lib/custom-proptypes';

const Tweet = ({ text }) => (
  <div>{ text }</div>
);

Tweet.propTypes = {
  text: createPropType(
    prop => typeof prop === 'string' && prop.length < 140
  ).isRequired
};

export default Tweet;
