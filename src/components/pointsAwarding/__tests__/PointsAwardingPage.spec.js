import React from 'react';
import expect from 'jest-matchers';
import ConnectedPointsAwardingPage, { PointsAwardingPage } from '../PointsAwardingPage';
import PointsAwardingForm from '../children/PointsAwardingForm';
import { shallow, mount } from 'enzyme';
import * as pointsAwardingActions from "../../../actions/pointsAwardingActions";
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe("PointsAwardingPage", () => {
  let component;
  const mockStore = configureStore();
  beforeEach(() => {
    component = shallow(<PointsAwardingPage/>);
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
    jest.spyOn(PointsAwardingPage.prototype, 'updateFieldsState');
    const form = shallow(<PointsAwardingPage/>).find('PointsAwardingForm');

    // when
    form.props().onChange(withEvent("", ""));

    // then
    expect(PointsAwardingPage.prototype.updateFieldsState).toHaveBeenCalled();
  });
  it("should pass 'saving' from state to form", () => {
    // when
    component.setState({saving: true});

    // then
    expect(component.find('PointsAwardingForm').props().saving).toBe(true);
  });
  it("should call submit method in form", () => {
    // given
    const spy = jest.spyOn(PointsAwardingPage.prototype, 'submit');
    const actions = {
      awardPoints: () => {}
    };
    const form = shallow(<PointsAwardingPage actions={actions}/>).find('PointsAwardingForm');

    // when
    form.props().onSubmit();

    // then
    expect(spy).toHaveBeenCalled();
  });
  it("should pass pointsAwarding object from state to form", () => {
    // when
    component.setState({pointsAwarding: {}});

    // then
    expect(component.find('PointsAwardingForm').props().pointsAwarding).toEqual({});
  });
  it("should update phone number in state", () => {
    // given
    const form = component.find('PointsAwardingForm');
    const event = withEvent("phoneNumber", "345");

    // when
    form.props().onChange(event);

    // then
    expect(component.instance().state.pointsAwarding.phoneNumber).toEqual("345");
  });
  it("should update amount in state from string to number", () => {
    // given
    const form = component.find('PointsAwardingForm');
    const event = withEvent("amount", "100");

    // when
    form.props().onChange(event);

    // then
    expect(component.instance().state.pointsAwarding.amount).toEqual(100);
  });
  it("should update sale key in state", () => {
    // given
    const form = component.find('PointsAwardingForm');
    const event = withEvent("saleKey", "key");

    // when
    form.props().onChange(event);

    // then
    expect(component.instance().state.pointsAwarding.saleKey).toEqual("key");
  });
  it("should map award points actions to props", () => {
    // given
    const connectedComponent = mount( <Provider store={mockStore()}><ConnectedPointsAwardingPage /></Provider> );

    // when
    const component = connectedComponent.find('PointsAwardingPage');

    // then
    expect(component.props().actions.awardPoints).toBeInstanceOf(Function);
  });
  it("should call award points action on submit", () => {
    // given
    const connectedComponent = mount( <Provider store={mockStore()}><ConnectedPointsAwardingPage /></Provider> );
    const component = connectedComponent.find('PointsAwardingPage');
    const form = component.find('PointsAwardingForm');
    const pointsAwarding = {
      phoneNumber: "",
      amount: 0,
      saleKey: ""
    };
    connectedComponent.setState({pointsAwarding});
    component.props().actions.awardPoints = jest.fn();

    // when
    form.props().onSubmit();

    // then
    expect(component.props().actions.awardPoints).toHaveBeenCalledWith(pointsAwarding);
  });
});
