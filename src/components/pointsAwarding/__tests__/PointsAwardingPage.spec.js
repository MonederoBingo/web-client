import React from 'react';
import expect from 'expect';
import PointsAwardingPage from '../PointsAwardingPage';
import PointsAwardingForm from '../children/PointsAwardingForm';
import ReactShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ReactShallowRenderer();

describe("PointsAwardingPage", () => {
  it("should render initial layout", () => {
     // when
     renderer.render(<PointsAwardingPage />);

     // then
     const result = renderer.getRenderOutput();
     expect(result.type).toBe('div');
     expect(result.props.children).toEqual(
        <PointsAwardingForm />);
  });
});
