/* eslint-disable no-unused-expressions, max-len, func-names */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import TweetFeed from './../examples/create-iterator-proptype/TweetFeed';
import InvalidCallbackUsage from './../examples/create-iterator-proptype/InvalidCallbackUsage';
import InvalidMessageUsage from './../examples/create-iterator-proptype/InvalidMessageUsage';

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
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <TweetFeed tweets={invalidTypeTweets} />
          <TweetFeed tweets={invalidLengthTweets} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `tweets[0]` supplied to `TweetFeed`. Validation failed.\n    in TweetFeed'
      )).to.equal(true);
    }));
  });

  describe('<InvalidCallbackUsage />', () => {
    it('should notify developer of incorrect usage of `callback` parameter',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidCallbackUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createIteratorPropType input: callback parameter must evaluate to a boolean value. See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidCallbackUsage'
      )).to.equal(true);
    }));
  });

  describe('<InvalidMessageUsage />', () => {
    it('should notify developer of incorrect usage of `message` parameter',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidMessageUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createIteratorPropType input:message parameter must be of type string. See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidMessageUsage'
      )).to.equal(true);
    }));
  });
});
