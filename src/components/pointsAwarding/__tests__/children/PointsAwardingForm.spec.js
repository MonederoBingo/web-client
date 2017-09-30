import React from 'react';
import expect from 'jest-matchers';
import PointsAwardingForm from '../../children/PointsAwardingForm';
import { shallow } from 'enzyme';
import NumberInput from "../../../common/NumberInput";

describe("PointsAwardingForm", () => {
  const props = {
    pointsAwarding: {
      phoneNumber: "",
      amount: 0,
      saleKey: "",
    },
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
    props.onChange = () => { called = true; };
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
    props.onSubmit = () => { called = true; };
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
  it("should set phone number from props", () => {
    // given
    props.pointsAwarding.phoneNumber = "123";

     // when
    const field = shallow(<PointsAwardingForm {...props}/>).find("[name='phoneNumber']");

     // then
     expect(field.prop('value')).toBe("123");
  });
  it("should set amount from props", () => {
    // given
    props.pointsAwarding.amount = 123;

     // when
    const field = shallow(<PointsAwardingForm {...props}/>).find("[name='amount']");

     // then
     expect(field.prop('value')).toBe(123);
  });
  it("should set sale key from props", () => {
    // given
    props.pointsAwarding.saleKey = "key";

     // when
    const field = shallow(<PointsAwardingForm {...props}/>).find("[name='saleKey']");

     // then
     expect(field.prop('value')).toBe("key");
  });
});
