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
    it("should return Promise", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');
      apiUtils.callApiService.mockImplementation(() => {
        return new Promise((resolve, reject) => {
           resolve();
        });
      });

      //when
      const result = pointsAwardingApi.awardPoints({phone: '333'});

      //then
      expect(result.then).toBeInstanceOf(Function);
    });
  });
});
