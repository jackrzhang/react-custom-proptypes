import React from 'react';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const InvalidCallbackUsage = ({ text }) => (
  <div>{text}</div>
);

InvalidCallbackUsage.propTypes = {
  text: createIteratorPropType(
    prop => `A boolean value is required to validate ${prop}`
  )
};

export default InvalidCallbackUsage;
