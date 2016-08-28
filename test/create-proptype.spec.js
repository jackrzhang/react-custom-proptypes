/* eslint-disable no-unused-expressions, max-len, func-names */
import React from 'react';
import { expect } from 'chai';
import sinon, { stub } from 'sinon';
import { shallow } from 'enzyme';

import Tweet from './../examples/create-proptype/Tweet';
import Card from './../examples/create-proptype/Card';
import InvalidCallbackUsage from './../examples/create-proptype/InvalidCallbackUsage';
import InvalidMessageUsage from './../examples/create-proptype/InvalidMessageUsage';

describe('createPropType', () => {
  describe('<Tweet />', () => {
    it('should have prop(s): `text`', () => {
      const wrapper = shallow(
        <Tweet text={'Dummy tweet text'} />
      );

      expect(wrapper.props().text).to.be.defined;
    });

    it('should require `text` prop to be supplied',
    sinon.test(function () {
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

    it('should validate `text` prop to be of type string and less than 140 characters',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Tweet text={42} />
          <Tweet text={'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfsadfasdfasdfasdfsadfsadfadfasdfasdfasdfasdfasdfsadfasdfasdfasdfsadfasfasfasfasdfasfasdfsafasf'} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `text` supplied to `Tweet`. Validation failed.\n    in Tweet'
      )).to.equal(true);
    }));
  });

  describe('<Card />', () => {
    it('should have prop(s): `suit` & `value`', () => {
      const wrapper = shallow(
        <Card suit={'spades'} value={8} />
      );

      expect(wrapper.props().suit).to.be.defined;
      expect(wrapper.props().value).to.be.defined;
    });

    it('should require props `suit` & `value` to be supplied',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(<Card value={8} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `suit` is marked as required in `Card`, but its value is `undefined`.\n    in Card'
      )).to.equal(true);

      shallow(<Card suit={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `suit` is marked as required in `Card`, but its value is `null`.\n    in Card'
      )).to.equal(true);

      shallow(<Card suit={'spades'} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `value` is marked as required in `Card`, but its value is `undefined`.\n    in Card'
      )).to.equal(true);

      shallow(<Card value={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `value` is marked as required in `Card`, but its value is `null`.\n    in Card'
      )).to.equal(true);
    }));

    it('should validate `suit` prop to be `spades`, `hearts`, `diamonds`, or `clubs`.',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Card suit={'invalid string'} value={8} />
          <Card suit={24} value={8} />
          <Card suit={[]} value={8} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `suit`: must be `spades`, `hearts`, `diamonds`, or `clubs`.\n    in Card'
      )).to.equal(true);
    }));

    it('should validate `value` prop to be an integer from 1 to 12',
    sinon.test(function () {
      const errorStub = this.stub(console, 'error');
      shallow(
        <div>
          <Card suit={'clubs'} value={NaN} />
          <Card suit={'clubs'} value={24} />
          <Card suit={'clubs'} value={0} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `value`: must be an integer from 1 - 12.\n    in Card'
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
        'Warning: Failed prop type: Invalid createPropType input: callback parameter must evaluate to a boolean value. See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidCallbackUsage'
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
        'Warning: Failed prop type: Invalid createPropType input: message parameter must be of type string. See https://github.com/jackrzhang/react-custom-proptypes#parameters for details.\n    in InvalidMessageUsage'
      )).to.equal(true);
    }));
  });
});
