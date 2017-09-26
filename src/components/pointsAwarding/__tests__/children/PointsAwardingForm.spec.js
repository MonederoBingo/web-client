import React from 'react';
import expect from 'jest-matchers';
import PointsAwardingForm from '../../children/PointsAwardingForm';
import { shallow } from 'enzyme';
import NumberInput from "../../../common/NumberInput";

describe("PointsAwardingForm", () => {
  it("should show initial layout", () => {
    // given
    const props = {
      onChange: () => {},
      onClick: () => {}
    };
     // when
     const wrapper = shallow(<PointsAwardingForm {...props}/>);

     // then
     expect(wrapper.find('div').children().nodes).toMatchSnapshot();
  });
  function fieldShouldCallOnChange(field) {
    // given
    let called = false;
    const props = {
      onChange: () => { called = true; },
      onClick: () => {}
    };
    const phoneInput = shallow(<PointsAwardingForm {...props}/>).find("[name='" + field + "']");

     // when
    phoneInput.simulate('change');

     // then
     expect(called).toBe(true);
  }
  it("should call onChange", () => {
     fieldShouldCallOnChange("phoneNumber");
     fieldShouldCallOnChange("amount");
     fieldShouldCallOnChange("saleKey");
  });
  it("should call onClick when submit is clicked", () => {
    // given
    let called = false;
    const props = {
      onChange: () => {},
      onClick: () => { called = true; }
    };
    const phoneInput = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // when
    phoneInput.simulate('click');

     // then
     expect(called).toBe(true);
  });
});
