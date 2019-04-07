import React from 'react';
import { createPropType } from '../../lib/custom-proptypes';

const InvalidCallbackUsage = ({ text }) => (
  <div>{text}</div>
);

InvalidCallbackUsage.propTypes = {
  text: createPropType(
    prop => `A boolean value is required to validate ${prop}`
  ).isRequired
};

export default InvalidCallbackUsage;
