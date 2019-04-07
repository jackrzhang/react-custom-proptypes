import React from 'react';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const InvalidCallbackUsage = props => (
  <div>{props.text}</div>
);

InvalidCallbackUsage.propTypes = {
  text: createIteratorPropType(
    prop => `A boolean value is required to validate ${prop}`
  )
};

export default InvalidCallbackUsage;
