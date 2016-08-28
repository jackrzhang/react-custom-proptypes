/* eslint-disable no-unused-expressions, max-len, func-names */
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import InvalidCallbackUsage from './../examples/create-iterator-proptype/InvalidCallbackUsage';
import InvalidMessageUsage from './../examples/create-iterator-proptype/InvalidMessageUsage';

describe('createIteratorPropType', () => {
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
