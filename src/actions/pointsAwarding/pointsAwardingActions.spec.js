import expect from 'expect';
import * as pointsAwardingActions from './pointsAwardingActions';
import * as types from '../actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';


describe('Points awarding actions', () => {
  describe('awardPointsSuccess', () => {
    //given
     const pointsAwarding = {phone: '55-555-55-55', saleAmount: '100', saleKey: 'ABCD'};
     const expectedAction = {
       type: types.AWARD_POINTS_SUCCESS,
       pointsAwarding: pointsAwarding
     };

     //when
     const action = pointsAwardingActions.awardPointsSuccess(pointsAwarding);

     //then
     expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

   it('should create BEGIN_AJAX_CALL and AWARD_POINTS_SUCCESS when awarding points', (done) => {
       const store = mockStore();
       store.dispatch(pointsAwardingActions.awardPoints({})).then(() => {
       const actions = store.getActions();
       expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
       expect(actions[1].type).toEqual(types.AWARD_POINTS_SUCCESS);
       done();
     }).catch((error) => {
       console.log(error);
       done();
     });
   });
});
