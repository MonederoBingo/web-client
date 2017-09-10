import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import {ajaxCallError} from './ajaxStatusActions';
import * as pointsAwardingApi from '../api/pointsAwardingApi';

export function awardPointsSuccess(pointsAwarding) {
  return {type: types.AWARD_POINTS_SUCCESS, pointsAwarding};
}

export function awardPoints(pointsAwarding) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      pointsAwardingApi.awardPoints(pointsAwarding).then(serviceResult => {
        if(serviceResult.success) {
          dispatch({type: 'POINTS_AWARDING_SUCCESS', serviceResult});

        } else {
          dispatch(ajaxCallError());
        }
      });
      resolve();
    });
  };
}
