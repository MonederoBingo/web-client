import React from 'react';
import expect from 'jest-matchers';
import ConnectedManageLoginPage, { ManageLoginPage } from '../ManageLoginPage';
import LoginForm from '../LoginForm';
import { shallow, mount } from 'enzyme';
import * as pointsAwardingActions from "../../../actions/pointsAwardingActions";
import { MemoryRouter as Router } from 'react-router-dom';

describe("ManageLoginPage", () => {
  let component, context;
  beforeEach(() => {
    const actions = {
      loginUser: () => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    };
    context = {
      router: {
        push: jest.fn()
      }
    };
    component = shallow(<ManageLoginPage actions={actions}/>, { context });
  });
  it('should call push on router to redirect to pointsAwarding page', () => {
    //given
    const form = component.find('LoginForm');
    const user = {
      email: 'email',
      password: 'password'
    };
    component.setState({user});
    component.setProps({
      loginResult: {
        success: true
      }
    });

    // when
    return form.props().onSave({preventDefault: () => {} }).then(() => {

      //then
      expect(context.router.push).toHaveBeenCalledWith('/awardPoints');
    });
  });
});
