import React from 'react';
import PointsAwardingForm from '../../children/PointsAwardingForm';
import { shallow } from 'enzyme';
import NumberInput from "../../../common/NumberInput";

describe("PointsAwardingForm", () => {
  it("should show initial layout", () => {
     // when
     const wrapper = shallow(<PointsAwardingForm />);

     // then
     expect(wrapper.find('div').children().nodes).toMatchSnapshot();
  });
});
