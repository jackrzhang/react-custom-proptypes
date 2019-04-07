import React from 'react';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const InvalidDescriptionUsage = ({ text }) => (
  <div>{text}</div>
);

InvalidDescriptionUsage.propTypes = {
  text: createIteratorPropType(
    prop => typeof prop === 'string',
    ['A custom description should be passed in as a value of type string.']
  )
};

export default InvalidDescriptionUsage;
