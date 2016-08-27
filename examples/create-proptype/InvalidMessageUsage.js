import React from 'react';
import { createPropType } from './../../lib/custom-proptypes';

const InvalidMessageUsage = props => (
  <div>{props.text}</div>
);

InvalidMessageUsage.propTypes = {
  text: createPropType(
    prop => typeof prop === 'string',
    ['A custom message should be passed in as a value of type string.']
  )
};

export default InvalidMessageUsage;
