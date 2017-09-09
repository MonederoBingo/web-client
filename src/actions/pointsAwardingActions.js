import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
var pointsAwardingApi = require('../api/pointsAwardingApi');

export function awardPointsSuccess(pointsAwarding) {
  return {type: types.AWARD_POINTS_SUCCESS, pointsAwarding};
}

export function awardPoints(pointsAwarding) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return new Promise((resolve, reject) => {
      pointsAwardingApi.awardPoints(pointsAwarding);
      dispatch(awardPointsSuccess(pointsAwarding));
      resolve();
    });
  };
}
