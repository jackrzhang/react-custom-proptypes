import React from 'react';
import PropTypes from 'prop-types';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const InvalidDescriptionUsage = ({ text }) => (
  <div>{text}</div>
);

InvalidDescriptionUsage.propTypes = {
  text: PropTypes.arrayOf(createIteratorPropType(
    prop => typeof prop === 'string',
    ['A custom description should be passed in as a value of type string.']
  )).isRequired
};

export default InvalidDescriptionUsage;
