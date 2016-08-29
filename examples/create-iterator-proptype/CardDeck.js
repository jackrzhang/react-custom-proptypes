import React, { PropTypes } from 'react';
import { createIteratorPropType } from './../../lib/custom-proptypes';

const CardDeck = props => (
  <div>
    {Object.keys(props.cards).map(key => (
      <div key={key}>
        <div>{props.cards[key].suit}</div>
        <div>{props.cards[key].value}</div>
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
