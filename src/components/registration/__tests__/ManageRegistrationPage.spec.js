import React from 'react';
import expect from 'jest-matchers';
import ConnectedManageRegistrationPage, { ManageRegistrationPage } from '../ManageRegistrationPage';
import RegistrationForm from '../RegistrationForm';
import { shallow, mount } from 'enzyme';
import * as pointsAwardingActions from "../../../actions/pointsAwardingActions";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe("ManageRegistrationPage", () => {
  let component;
  const mockStore = configureStore();
  beforeEach(() => {
    component = shallow(<ManageRegistrationPage/>);
  });
  function withEvent(name, value) {
    const event = {
      target: {
        name: name,
        value: value,
      }
    };
    return event;
  }
  it("should render initial layout", () => {
    // then
    expect(component.find('div').children().nodes).toMatchSnapshot();
  });
  it("should call updateFieldsState method in form", () => {
    // given
    jest.spyOn(ManageRegistrationPage.prototype, 'updateUserState');
    const form = shallow(<ManageRegistrationPage/>).find('RegistrationForm');

    // when
    form.props().onChange(withEvent("", ""));

    // then
    expect(ManageRegistrationPage.prototype.updateUserState).toHaveBeenCalled();
  });
  it("should pass 'saving' from state to form", () => {
    // when
    component.setState({saving: true});

    // then
    expect(component.find('RegistrationForm').props().saving).toBe(true);
  });
  it("should call saveUser method in form's onSave", () => {
    // given
    const spy = jest.spyOn(ManageRegistrationPage.prototype, 'saveUser');
    const actions = {
      createUser: () => {
        return new Promise((resolve) => {
          resolve();
        });
      }
    };
    const comp = shallow(<ManageRegistrationPage actions={actions}/>);
    const form = comp.find('RegistrationForm');
    const user = {
      email: 'email',
      password: 'password'
    };
    comp.setState({user});

    // when
    form.props().onSave({preventDefault: () => {} });

    // then
    expect(spy).toHaveBeenCalled();
  });
  it("should pass user object from state to form", () => {
    // when
    component.setState({user: {username: "username1"}});

    // then
    expect(component.find('RegistrationForm').props().user).toEqual({username: "username1"});
  });
  it("should update phone number in state", () => {
    // given
    const form = component.find('RegistrationForm');
    const event = withEvent("username", "newUsername");

    // when
    form.props().onChange(event);

    // then
    expect(component.instance().state.user.username).toEqual("newUsername");
  });
  it("should update password in state", () => {
    // given
    const form = component.find('RegistrationForm');
    const event = withEvent("password", "password");

    // when
    form.props().onChange(event);

    // then
    expect(component.instance().state.user.password).toEqual("password");
  });
  it("should map registration actions to props", () => {
    // given
    const connectedComponent = mount( <Provider store={mockStore()}><ConnectedManageRegistrationPage /></Provider> );

    // when
    const component = connectedComponent.find('ManageRegistrationPage');

    // then
    expect(component.props().actions.createUser).toBeInstanceOf(Function);
  });
});
