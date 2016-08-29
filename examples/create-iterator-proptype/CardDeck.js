import React, { PropTypes } from 'react';
import { createIteratorPropType } from './../../lib/custom-proptypes';

const CardDeck = props => (
  <div>
    {props.cards.map((card, key) => (
      <div key={key}>
        <div>{card.suit}</div>
        <div>{card.value}</div>
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
