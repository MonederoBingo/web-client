import * as types from '../actionTypes';
import {beginAjaxCall} from '../ajaxStatusActions';


export function awardPointsSuccess(pointsAwarding) {
  return {type: types.AWARD_POINTS_SUCCESS, pointsAwarding};
}


export function awardPoints(pointsAwarding) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(beginAjaxCall());
      dispatch(awardPointsSuccess(pointsAwarding));
      resolve();
    });
  };
}
