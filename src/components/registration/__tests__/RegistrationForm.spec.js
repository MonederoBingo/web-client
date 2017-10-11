import React from 'react';
import expect from 'jest-matchers';
import RegistrationForm from '../RegistrationForm';
import {shallow} from 'enzyme';
import NumberInput from "../../common/NumberInput";

describe("RegistrationForm", () => {
  const props = {
    registration: {
      email: "",
      password: "",
      passwordConfirmation: "",
      companyName: "",
    },
    errors: {
      email: "",
      password: ""
    },
    onChange: () => {}
  };
  it("should show initial layout", () => {
    // when
    const component = shallow(<RegistrationForm {...props}/>);

    // then
    expect(component.children().nodes).toMatchSnapshot();
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
  it("password confirmation should call onChange", () => {
    // given
    let called = false;
    props.onChange = () => {
      called = true;
    };
    const input = shallow(<RegistrationForm {...props}/>).find("[name='passwordConfirmation']");

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
  it("should disable submit if saving param returns true", () => {
    // given
    props.saving = true;

     // when
    const component = shallow(<RegistrationForm {...props}/>).find("[id='submit']");

     // then
     expect(component.prop('disabled')).toBe(true);
  });
  it("should enable submit if saving param returns false", () => {
    // given
    props.saving = false;

     // when
    const component = shallow(<RegistrationForm {...props}/>).find("[id='submit']");

     // then
     expect(component.prop('disabled')).toBe(false);
  });
  it("should set companyName from props", () => {
    // given
    props.registration.companyName = "name";

     // when
    const field = shallow(<RegistrationForm {...props}/>).find("[name='companyName']");

     // then
     expect(field.prop('value')).toBe("name");
  });
  it("should set email from props", () => {
    // given
    props.registration.email = "a@a.com";

     // when
    const field = shallow(<RegistrationForm {...props}/>).find("[name='email']");

     // then
     expect(field.prop('value')).toBe("a@a.com");
  });
  it("should set password from props", () => {
    // given
    props.registration.password = "password";

     // when
    const field = shallow(<RegistrationForm {...props}/>).find("[name='password']");

     // then
     expect(field.prop('value')).toBe("password");
  });
  it("should set password confirmation from props", () => {
    // given
    props.registration.passwordConfirmation = "password";

     // when
    const field = shallow(<RegistrationForm {...props}/>).find("[name='passwordConfirmation']");

     // then
     expect(field.prop('value')).toBe("password");
  });
});
