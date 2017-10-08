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
  // it("should pass pointsAwarding object from state to form", () => {
  //   // when
  //   component.setState({pointsAwarding: {}});
  //
  //   // then
  //   expect(component.find('RegistrationForm').props().pointsAwarding).toEqual({});
  // });
  // it("should update phone number in state", () => {
  //   // given
  //   const form = component.find('RegistrationForm');
  //   const event = withEvent("phoneNumber", "345");
  //
  //   // when
  //   form.props().onChange(event);
  //
  //   // then
  //   expect(component.instance().state.pointsAwarding.phoneNumber).toEqual("345");
  // });
  // it("should update amount in state", () => {
  //   // given
  //   const form = component.find('RegistrationForm');
  //   const event = withEvent("amount", 100);
  //
  //   // when
  //   form.props().onChange(event);
  //
  //   // then
  //   expect(component.instance().state.pointsAwarding.amount).toEqual(100);
  // });
  // it("should update sale key in state", () => {
  //   // given
  //   const form = component.find('RegistrationForm');
  //   const event = withEvent("saleKey", "key");
  //
  //   // when
  //   form.props().onChange(event);
  //
  //   // then
  //   expect(component.instance().state.pointsAwarding.saleKey).toEqual("key");
  // });
  // it("should map award points actions to props", () => {
  //   // given
  //   const connectedComponent = mount( <Provider store={mockStore()}><ConnectedManageRegistrationPage /></Provider> );
  //
  //   // when
  //   const component = connectedComponent.find('ManageRegistrationPage');
  //
  //   // then
  //   expect(component.props().actions.awardPoints).toBeInstanceOf(Function);
  // });
  // it("should call award points action on submit", () => {
  //   // given
  //   const connectedComponent = mount( <Provider store={mockStore()}><ConnectedManageRegistrationPage /></Provider> );
  //   const component = connectedComponent.find('ManageRegistrationPage');
  //   const form = component.find('RegistrationForm');
  //   component.props().actions.awardPoints = jest.fn();
  //
  //   // when
  //   form.props().onSubmit();
  //
  //   // then
  //   expect(component.props().actions.awardPoints).toHaveBeenCalled();
  // });
});
