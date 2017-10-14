import * as apiUtils from './apiUtils';

export function awardPoints(pointsAwarding) {
  return apiUtils.callApiService("POST", "points", pointsAwarding);
}
