/* eslint-disable no-unused-expressions, max-len, func-names */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import { shallow } from 'enzyme';

import TweetFeed from './../examples/create-iterator-proptype/TweetFeed';
import CardDeck from './../examples/create-iterator-proptype/CardDeck';
import InvalidCallbackUsage from './../examples/create-iterator-proptype/InvalidCallbackUsage';
import InvalidDescriptionUsage from './../examples/create-iterator-proptype/InvalidDescriptionUsage';

const test = sinonTest(sinon);

describe('createIteratorPropType', () => {
  describe('<TweetFeed />', () => {
    const validTweets = [
      'A tweet!',
      'And another string',
      'All tweets should be under 140 characters.'
    ];

    const invalidTypeTweets = [
      24,
      [],
      {}
    ];

    const invalidLengthTweets = [
      'A tweet under 140 characters',
      'A tweet above 140 characters - asdflk;asdjfkl;asdjfl;asjdf;aksjdl;fajsld;fjalsd;fjas;dfjals;djfa;sjf;asdjf;asdjf;asdjf;asdjfasfa;sdfjasdfasdfasdfasdfkajlsdfals;df'
    ];

    it('should have prop(s): `tweets`', () => {
      const wrapper = shallow(
        <TweetFeed tweets={validTweets} />
      );

      expect(wrapper.props().tweets).to.be.defined;
    });

    it('should validate each element of prop `tweets` to be of type string and less than 140 characters',
    test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <TweetFeed tweets={invalidTypeTweets} />
          <TweetFeed tweets={invalidLengthTweets} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `tweets[0]` of type `number` supplied.\n    in TweetFeed'
      )).to.equal(true);
    }));
  });

  describe('<CardDeck />', () => {
    const validCards = {
      1: {
        suit: 'spades',
        value: 1
      },
      25: {
        suit: 'clubs',
        value: 1
      }
    };

    const invalidSuitCards = {
      1: {
        suit: 'invalid suit',
        value: 1
      },
      25: {
        suit: 'clubs',
        value: 1
      }
    };

    const invalidValueCards = {
      1: {
        suit: 'spades',
        value: 15
      },
      25: {
        suit: 'clubs',
        value: 1
      }
    };

    const invalidKeyCards = {
      65: {
        suit: 'spades',
        value: 1
      },
      invalidKey: {
        suit: 'clubs',
        value: 1
      }
    };

    it('should have prop(s): `cards`', () => {
      const wrapper = shallow(
        <CardDeck cards={validCards} />
      );

      expect(wrapper.props().cards).to.be.defined;
    });

    it('should validate `cards` prop to have keys that are numbers from 1 - 52 and ' +
       'elements that have valid suit and value properties',
    test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <CardDeck cards={invalidKeyCards} />
          <CardDeck cards={invalidSuitCards} />
          <CardDeck cards={invalidValueCards} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `cards.65` of type `object` supplied.\n    in CardDeck'
      )).to.equal(true);
    }));
  });

  describe('<InvalidCallbackUsage />', () => {
    it('should notify developer of incorrect usage of `callback` parameter',
    test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidCallbackUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createIteratorPropType input:\ncallback parameter must evaluate to a boolean value. \nSee https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidCallbackUsage'
      )).to.equal(true);
    }));
  });

  describe('<InvalidDescriptionUsage />', () => {
    it('should notify developer of incorrect usage of `description` parameter',
    test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidDescriptionUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createIteratorPropType input:\ndescription parameter must be of type string.\nSee https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidDescriptionUsage'
      )).to.equal(true);
    }));
  });
});
