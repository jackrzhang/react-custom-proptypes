/* eslint-disable no-unused-expressions, max-len */
import React from 'react';
import { expect } from 'chai';
import { stub } from 'sinon';
import { shallow } from 'enzyme';

import Tweet from './../examples/Tweet';
import InvalidCallbackUsage from './../examples/InvalidCallbackUsage';
import InvalidMessageUsage from './../examples/InvalidMessageUsage';

describe('Examples', () => {
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

      shallow(<Tweet text={null} />);

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: The `text` is marked as required in `Tweet`, but its value is `null`.\n    in Tweet'
      )).to.equal(true);

      console.error.restore();
    });

    it('should validate `text` prop to be of type string and less than 140 characters', () => {
      const errorStub = stub(console, 'error');
      shallow(
        <div>
          <Tweet text={42} />
          <Tweet text={'asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdfsadfasdfasdfasdfsadfsadfadfasdfasdfasdfasdfasdfsadfasdfasdfasdfsadfasfasfasfasdfasfasdfsafasf'} />
        </div>
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid prop `text` supplied to `Tweet`. Validation failed.\n    in Tweet'
      )).to.equal(true);

      console.error.restore();
    });
  });

  describe('<InvalidCallbackUsage />', () => {
    it('should notify developer of incorrect usage of `callback` parameter', () => {
      const errorStub = stub(console, 'error');
      shallow(
        <InvalidCallbackUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createPropType input: callback parameter must evaluate to a boolean value. See https://github.com/jackrzhang/react-create-proptype#parameters for details.\n    in InvalidCallbackUsage'
      )).to.equal(true);

      console.error.restore();
    });
  });

  describe('<InvalidMessageUsage />', () => {
    it('should notify developer of incorrect usage of `message` parameter', () => {
      const errorStub = stub(console, 'error');
      shallow(
        <InvalidMessageUsage text={'Dummy text'} />
      );

      expect(errorStub.calledWithExactly(
        'Warning: Failed prop type: Invalid createPropType input: message parameter must be of type string. See https://github.com/jackrzhang/react-create-proptype#parameters for details.\n    in InvalidMessageUsage'
      )).to.equal(true);

      console.error.restore();
    });
  });
});
