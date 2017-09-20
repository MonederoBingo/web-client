import React from 'react';
import PointsAwarding from '../PointsAwarding';
import ReactShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ReactShallowRenderer();

describe("PointsAwarding", () => {
  it("initial rendering", () => {
     // when
     renderer.render(<PointsAwarding />);

     // then
     const result = renderer.getRenderOutput();
     expect(result.type).toBe('div');
     expect(result.props.children).toEqual([
        <input id="phoneNumber" />,
        <input id="saleKey" />
        ]);
  });
});
