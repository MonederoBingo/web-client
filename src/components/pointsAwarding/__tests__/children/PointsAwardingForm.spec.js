import React from 'react';
import expect from 'expect';
import PointsAwardingForm from '../../children/PointsAwardingForm';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import NumberInput from "../../../common/NumberInput";
const renderer = new ReactShallowRenderer();

describe("PointsAwardingForm", () => {
  it("should show initial layout", () => {
     // when
     renderer.render(<PointsAwardingForm />);

     // then
     const result = renderer.getRenderOutput();
     expect(result.type).toBe('div');
     expect(result.props.children).toEqual([
        <NumberInput name='phoneNumber' label='Phone #' onChange={() => {}} placeholder='Phone #'/>,
        <NumberInput name='amount' label='Amount' onChange={() => {}} placeholder='Amount'/>
     ]);
  });
});
