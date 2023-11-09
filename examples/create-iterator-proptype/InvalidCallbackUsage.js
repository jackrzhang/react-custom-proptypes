import React from 'react';
import PropTypes from 'prop-types';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const InvalidCallbackUsage = ({ text }) => (
  <div>{text}</div>
);

InvalidCallbackUsage.propTypes = {
  text: PropTypes.arrayOf(createIteratorPropType(
    prop => `A boolean value is required to validate ${prop}`
  )).isRequired
};

export default InvalidCallbackUsage;
