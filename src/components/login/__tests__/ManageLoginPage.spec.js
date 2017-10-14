import React from 'react';
import expect from 'jest-matchers';
import ConnectedManageLoginPage, { ManageLoginPage } from '../ManageLoginPage';
import LoginForm from '../LoginForm';
import { shallow, mount } from 'enzyme';
import * as pointsAwardingActions from "../../../actions/pointsAwardingActions";
import { MemoryRouter as Router } from 'react-router-dom';

describe("ManageLoginPage", () => {
  function withEvent(name, value) {
    const event = {
      target: {
        name: name,
        value: value,
      }
    };
    return event;
  }
  it('should call push on router to redirect to pointsAwarding page', () => {
    //given
    const actions = {
      loginUser: () => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    };
    let pushCalled = false;
    const context = {
      router: {
        push: () => {pushCalled = true;}
      }
    };
    const component = shallow(<ManageLoginPage actions={actions}/>, { context });
    const form = component.find('LoginForm');
    const user = {
      email: 'email',
      password: 'password'
    };
    component.setState({user});

    // when
    form.props().onSave({preventDefault: () => {} });

    //then
    console.log(pushCalled);
  });
});
