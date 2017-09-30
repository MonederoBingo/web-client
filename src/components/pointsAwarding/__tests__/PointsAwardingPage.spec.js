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
  it("should call updateFieldsState method in form", () => {
    // given
    jest.spyOn(PointsAwardingPage.prototype, 'updateFieldsState');
    const form = shallow(<PointsAwardingPage />).find('PointsAwardingForm');

    // when
    form.props().onChange();

    // then
    expect(PointsAwardingPage.prototype.updateFieldsState).toHaveBeenCalled();
  });
  it("should pass 'saving' from state to form", () => {
    // given
    const component = shallow(<PointsAwardingPage />);

    // when
    component.setState({saving: true});

    // then
    expect(component.find('PointsAwardingForm').props().saving).toBe(true);
  });
  it("should call submit method in form", () => {
    // given
    jest.spyOn(PointsAwardingPage.prototype, 'submit');
    const form = shallow(<PointsAwardingPage />).find('PointsAwardingForm');

    // when
    form.props().onSubmit();

    // then
    expect(PointsAwardingPage.prototype.submit).toHaveBeenCalled();
  });
  it("should pass pointsAwarding object from state to form", () => {
    // given
    const component = shallow(<PointsAwardingPage />);

    // when
    component.setState({pointsAwarding: {}});

    // then
    expect(component.find('PointsAwardingForm').props().pointsAwarding).toEqual({});
  });
});
