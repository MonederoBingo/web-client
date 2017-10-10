import React from 'react';
import expect from 'jest-matchers';
import RegistrationForm from '../RegistrationForm';
import {shallow} from 'enzyme';
import NumberInput from "../../common/NumberInput";

describe("RegistrationForm", () => {
  const props = {
    user: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    },
    onChange: () => {}
  };
  it("should show initial layout", () => {
    // when
    const wrapper = shallow(<RegistrationForm {...props}/>);

    // then
    expect(wrapper.children().nodes).toMatchSnapshot();
  });
  it("companyName should call onChange", () => {
    // given
    let called = false;
    props.onChange = () => {
      called = true;
    };
    const input = shallow(<RegistrationForm {...props}/>).find("[name='companyName']");

    // when
    input.simulate('change');

    // then
    expect(called).toBe(true);
  });
  it("email should call onChange", () => {
    // given
    let called = false;
    props.onChange = () => {
      called = true;
    };
    const input = shallow(<RegistrationForm {...props}/>).find("[name='email']");

    // when
    input.simulate('change');

    // then
    expect(called).toBe(true);
  });
  it("password should call onChange", () => {
    // given
    let called = false;
    props.onChange = () => {
      called = true;
    };
    const input = shallow(<RegistrationForm {...props}/>).find("[name='password']");

    // when
    input.simulate('change');

    // then
    expect(called).toBe(true);
  });
  it("should call onSubmit when submit is clicked", () => {
    // given
    let called = false;
    props.onSave = () => { called = true; };
    const submit = shallow(<RegistrationForm {...props}/>).find("[id='submit']");

     // when
    submit.simulate('click');

     // then
     expect(called).toBe(true);
  });
  // it("should disable submit if saving param returns true", () => {
  //   // given
  //   props.saving = true;
  //
  //    // when
  //   const wrapper = shallow(<RegistrationForm {...props}/>).find("[id='save']");
  //
  //    // then
  //    expect(wrapper.prop('disabled')).toBe(true);
  // });
  // it("should enable submit if saving param returns false", () => {
  //   // given
  //   props.saving = false;
  //
  //    // when
  //   const wrapper = shallow(<RegistrationForm {...props}/>).find("[id='save']");
  //
  //    // then
  //    expect(wrapper.prop('disabled')).toBe(false);
  // });
  // it("should set phone number from props", () => {
  //   // given
  //   props.pointsAwarding.phoneNumber = "123";
  //
  //    // when
  //   const field = shallow(<RegistrationForm {...props}/>).find("[name='phoneNumber']");
  //
  //    // then
  //    expect(field.prop('value')).toBe("123");
  // });
  // it("should set amount from props", () => {
  //   // given
  //   props.pointsAwarding.amount = 123;
  //
  //    // when
  //   const field = shallow(<RegistrationForm {...props}/>).find("[name='amount']");
  //
  //    // then
  //    expect(field.prop('value')).toBe(123);
  // });
  // it("should set sale key from props", () => {
  //   // given
  //   props.pointsAwarding.saleKey = "key";
  //
  //    // when
  //   const field = shallow(<RegistrationForm {...props}/>).find("[name='saleKey']");
  //
  //    // then
  //    expect(field.prop('value')).toBe("key");
  // });
});
