import React from 'react';
import createPropType from './../lib/create-proptype';

const InvalidMessageUsage = props => (
  <div>{props.text}</div>
);

InvalidMessageUsage.propTypes = {
  text: createPropType(
    prop => typeof prop === 'string',
    ['An custom message should be passed in as a value of type string.']
  )
};

export default InvalidMessageUsage;
