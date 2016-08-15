/* eslint-disable no-unused-expressions, max-len */
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { shallow } from 'enzyme';

import Tweet from './../examples/Tweet.jsx';

// console.log(errorStub.getCall(0).args);
describe('examples', () => {
  describe('<Tweet />', () => {
    it('should have prop(s): `text`', () => {
      const wrapper = shallow(
        <Tweet text={'Dummy tweet text'} />
      );
      expect(wrapper.props().text).to.be.defined;
    });

    it('should require `text` prop to be supplied', () => {
      const errorStub = stub(console, 'error');
      shallow(<Tweet />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `text` is marked as required in `Tweet`, but its value is `undefined`.\n    in Tweet'
      )).to.equal(true);

      console.error.restore();
    });

    it('should require `text` prop to be of type string', () => {
      const errorStub = stub(console, 'error');
      shallow(
        <Tweet text={42} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `text` supplied to `Tweet`. Validation failed.\n    in Tweet'
      )).to.equal(true);

      console.error.restore();
    });
  });
});
