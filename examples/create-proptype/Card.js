import React from 'react';
import { createPropType } from '../../lib/custom-proptypes';

const Card = ({ suit, value }) => (
  <div>
    <div>{suit}</div>
    <div>{value}</div>
  </div>
);

const suitPropType = createPropType(
  prop =>
    prop === 'spades' ||
    prop === 'hearts' ||
    prop === 'diamonds' ||
    prop === 'clubs',
  'Must be `spades`, `hearts`, `diamonds`, or `clubs`.'
);

const valuePropType = createPropType(
  prop =>
    Number.isInteger(prop) &&
    prop >= 1 &&
    prop <= 12,
  'Must be an integer from 1 - 12.'
);

Card.propTypes = {
  suit: suitPropType.isRequired,
  value: valuePropType.isRequired
};

export default Card;
