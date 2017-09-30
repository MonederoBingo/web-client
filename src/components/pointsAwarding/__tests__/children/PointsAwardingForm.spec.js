import React from 'react';
import expect from 'jest-matchers';
import PointsAwardingForm from '../../children/PointsAwardingForm';
import { shallow } from 'enzyme';
import NumberInput from "../../../common/NumberInput";

describe("PointsAwardingForm", () => {
  const props = {
    onChange: () => {},
    onSubmit: () => {},
    saving: false,
  };
  it("should show initial layout", () => {
     // when
     const wrapper = shallow(<PointsAwardingForm {...props}/>);

     // then
     expect(wrapper.find('div').children().nodes).toMatchSnapshot();
  });
  function fieldShouldCallOnChange(field) {
    // given
    let called = false;
    props.onChange = () => { called = true; }
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
  it("should call onSubmit when submit is clicked", () => {
    // given
    let called = false;
    props.onSubmit = () => { called = true; }
    const submit = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // when
    submit.simulate('click');

     // then
     expect(called).toBe(true);
  });
  it("should disable submit if saving param returns true", () => {
    // given
    props.saving = true;

     // when
    const wrapper = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // then
     expect(wrapper.prop('disabled')).toBe(true);
  });
  it("should enable submit if saving param returns false", () => {
    // given
    props.saving = false;

     // when
    const wrapper = shallow(<PointsAwardingForm {...props}/>).find("[id='save']");

     // then
     expect(wrapper.prop('disabled')).toBe(false);
  });
});
