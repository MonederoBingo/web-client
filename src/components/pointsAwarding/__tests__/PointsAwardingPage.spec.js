import React from 'react';
import expect from 'jest-matchers';
import PointsAwardingPage from '../PointsAwardingPage';
import PointsAwardingForm from '../children/PointsAwardingForm';
import { shallow } from 'enzyme';

describe("PointsAwardingPage", () => {
  it("should render initial layout", () => {
    // when
    const wrapper = shallow(<PointsAwardingPage/>);

    // then
    expect(wrapper.find('div').children().nodes).toMatchSnapshot();
  });
  it("should call change method in form", () => {
    // given
    jest.spyOn(PointsAwardingPage.prototype, 'change');
    const form = shallow(<PointsAwardingPage />).find('PointsAwardingForm');

    // when
    form.props().onChange();

    // then
    expect(PointsAwardingPage.prototype.change).toHaveBeenCalled();
  });
  it("should pass 'saving' from state to form", () => {
    // given
    jest.spyOn(PointsAwardingPage.prototype, 'change');
    const component = shallow(<PointsAwardingPage />);

    // when
    component.setState({saving: true});

    // then
    expect(component.find('PointsAwardingForm').props().saving).toBe(true);
  });
});
