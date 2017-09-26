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
      onClick: () => {},
      saving: false
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
      onClick: () => {},
      saving: false
    };
    const input = shallow(<PointsAwardingForm {...props}/>).find("[name='" + field + "']");

     // when
    input.simulate('change');

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
    const submit = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // when
    submit.simulate('click');

     // then
     expect(called).toBe(true);
  });
  it("should disable submit if saving param returns true", () => {
    // given
    const props = {
      onChange: () => {},
      onClick: () => {},
      saving: true
    };

     // when
    const wrapper = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // then
     expect(wrapper.prop('disabled')).toBe(true);
  });
  it("should enable submit if saving param returns false", () => {
    // given
    const props = {
      onChange: () => {},
      onClick: () => {},
      saving: false
    };

     // when
    const wrapper = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // then
     expect(wrapper.prop('disabled')).toBe(false);
  });
});
