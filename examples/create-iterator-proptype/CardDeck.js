import React from 'react';
import { PropTypes } from 'prop-types';
import { createIteratorPropType } from '../../lib/custom-proptypes';

const CardDeck = ({ cards }) => (
  <div>
    {Object.keys(cards).map(key => (
      <div key={key}>
        <div>{cards[key].suit}</div>
        <div>{cards[key].value}</div>
      </div>
    ))}
  </div>
);

const cardPropType = createIteratorPropType(
  (prop, key) =>
    (
      prop.suit === 'spades' ||
      prop.suit === 'hearts' ||
      prop.suit === 'diamonds' ||
      prop.suit === 'clubs'
    ) &&
    (
      Number.isInteger(prop.value) &&
      prop.value >= 1 &&
      prop.value <= 12
    ) &&
    (
      Number(key) >= 1 &&
      Number(key) <= 52
    )
);

CardDeck.propTypes = {
  cards: PropTypes.objectOf(cardPropType).isRequired
};

export default CardDeck;
