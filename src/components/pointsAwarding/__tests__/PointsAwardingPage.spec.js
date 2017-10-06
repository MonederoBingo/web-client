import React from 'react';
import expect from 'jest-matchers';
import PointsAwardingPage from '../PointsAwardingPage';
import PointsAwardingForm from '../children/PointsAwardingForm';
import { shallow } from 'enzyme';

describe("PointsAwardingPage", () => {
  let component;
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
    jest.spyOn(PointsAwardingPage.prototype, 'submit');
    const form = shallow(<PointsAwardingPage/>).find('PointsAwardingForm');

    // when
    form.props().onSubmit();

    // then
    expect(PointsAwardingPage.prototype.submit).toHaveBeenCalled();
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
  it("should update amount in state", () => {
    // given
    const form = component.find('PointsAwardingForm');
    const event = withEvent("amount", 100);

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
});
