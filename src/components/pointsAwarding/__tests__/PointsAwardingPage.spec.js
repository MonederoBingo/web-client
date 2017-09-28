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
    spyOn(PointsAwardingPage.prototype, 'change').and.callThrough();
    const form = shallow(<PointsAwardingPage />).find('PointsAwardingForm');

    // when
    form.props().onChange();

    // then
    expect(PointsAwardingPage.prototype.change).toHaveBeenCalled();
  });
});
