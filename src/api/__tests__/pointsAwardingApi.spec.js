jest.enableAutomock();
jest.unmock('../pointsAwardingApi.js');
const pointsAwardingApi = require('../pointsAwardingApi.js');
const apiUtils = require("../apiUtils");

describe("points awarding api", () => {
  describe("awardPoints", () => {
    it("should call apiUtils", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      pointsAwardingApi.awardPoints({phone: '555'});

      //then
      expect(apiUtils.callApiService).toBeCalledWith('POST', 'points', {phone: '555'});
    });
    it("should call apiUtils using parameter as body argument", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      pointsAwardingApi.awardPoints({phone: '333'});

      //then
      expect(apiUtils.callApiService).toBeCalledWith('POST', 'points', {phone: '333'});
    });
  });
});
