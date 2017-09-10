import * as apiUtils from './apiUtils';

export function awardPoints() {
  apiUtils.callApiService("POST", "points", {"phone": "555"});
}
