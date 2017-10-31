jest.enableAutomock();
jest.unmock('../pointsAwardingApi.js');
const pointsAwardingApi = require('../pointsAwardingApi.js');
const apiUtils = require("../apiUtils");

describe("points awarding api", () => {
  describe("awardPoints", () => {
    it("should call apiUtils with correct method", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      pointsAwardingApi.awardPoints({});

      //then
      expect(apiUtils.callApiService).toBeCalledWith('POST', expect.any(String), expect.anything());
    });
    it("should call apiUtils with correct path", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      pointsAwardingApi.awardPoints({});

      //then
      expect(apiUtils.callApiService).toBeCalledWith(expect.any(String), 'api/v1/points', expect.anything());
    });
    it("should call apiUtils using parameter as body argument", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      pointsAwardingApi.awardPoints({phone: '333'});

      //then
      expect(apiUtils.callApiService).toBeCalledWith(expect.any(String), expect.any(String), {phone: '333'});
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
