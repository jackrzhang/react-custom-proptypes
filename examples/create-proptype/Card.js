import React from 'react';
import { createPropType } from './../../lib/custom-proptypes';

const Card = props => (
  <div>
    <div>{props.suit}</div>
    <div>{props.value}</div>
  </div>
);

const suitPropType = createPropType(
  prop =>
    prop === 'spades' ||
    prop === 'hearts' ||
    prop === 'diamonds' ||
    prop === 'clubs',
  'Invalid prop `suit`: must be `spades`, `hearts`, `diamonds`, or `clubs`.'
);

const valuePropType = createPropType(
  prop =>
    typeof prop === 'number' &&
    Number.isInteger(prop) &&
    prop >= 1 && prop <= 12,
  'Invalid prop `value`: must be an integer from 1 - 12.'
);

Card.propTypes = {
  suit: suitPropType.isRequired,
  value: valuePropType.isRequired
};

export default Card;
