/* eslint-disable no-unused-expressions, max-len, func-names */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import { shallow } from 'enzyme';

import Tweet from '../examples/create-proptype/Tweet';
import Card from '../examples/create-proptype/Card';
import InvalidCallbackUsage from '../examples/create-proptype/InvalidCallbackUsage';
import InvalidDescriptionUsage from '../examples/create-proptype/InvalidDescriptionUsage';

const test = sinonTest(sinon);

describe('createPropType', () => {
  describe('<Tweet />', () => {
    it('should require `text` prop to be supplied', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(<Tweet />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `text` is marked as required in `Tweet`, but its value is `undefined`.\n    in Tweet'
      )).to.equal(true);

      shallow(<Tweet text={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `text` is marked as required in `Tweet`, but its value is `null`.\n    in Tweet'
      )).to.equal(true);
    }));

    it('should validate `text` prop to be of type string and less than 140 characters', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Tweet text={42} />
          <Tweet text="asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfsadfasdfasdfasdfsadfsadfadfasdfasdfasdfasdfasdfsadfasdfasdfasdfsadfasfasfasfasdfasfasdfsafasf" />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `text` supplied of type `Number`.\n    in Tweet'
      )).to.equal(true);
    }));
  });

  describe('<Card />', () => {
    it('should require props `suit` & `value` to be supplied', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(<Card value={8} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `suit` is marked as required in `Card`, but its value is `undefined`.\n    in Card'
      )).to.equal(true);

      shallow(<Card suit={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `suit` is marked as required in `Card`, but its value is `null`.\n    in Card'
      )).to.equal(true);

      shallow(<Card suit="spades" />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `value` is marked as required in `Card`, but its value is `undefined`.\n    in Card'
      )).to.equal(true);

      shallow(<Card value={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `value` is marked as required in `Card`, but its value is `null`.\n    in Card'
      )).to.equal(true);
    }));

    it('should validate `suit` prop to be `spades`, `hearts`, `diamonds`, or `clubs`.', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Card suit="invalid string" value={8} />
          <Card suit={24} value={8} />
          <Card suit={[]} value={8} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `suit` supplied of type `String`.\nMust be `spades`, `hearts`, `diamonds`, or `clubs`.\n    in Card'
      )).to.equal(true);
    }));

    it('should validate `value` prop to be an integer from 1 to 12', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Card suit="clubs" value={NaN} />
          <Card suit="clubs" value={24} />
          <Card suit="clubs" value={0} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `value` supplied of type `Number`.\nMust be an integer from 1 - 12.\n    in Card'
      )).to.equal(true);
    }));
  });

  describe('<InvalidCallbackUsage />', () => {
    it('should notify developer of incorrect usage of `callback` parameter', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidCallbackUsage text="Dummy text" />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createPropType input: callback parameter must evaluate to a boolean value.\nSee https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidCallbackUsage'
      )).to.equal(true);
    }));
  });

  describe('<InvalidDescriptionUsage />', () => {
    it('should notify developer of incorrect usage of `description` parameter', test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <InvalidDescriptionUsage text="Dummy text" />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createPropType input: description parameter must be of type string.\nSee https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidDescriptionUsage'
      )).to.equal(true);
    }));
  });
});
