import * as apiUtils from './apiUtils';

export function awardPoints(pointsAwarding) {
  apiUtils.callApiService("POST", "points", pointsAwarding);
}
