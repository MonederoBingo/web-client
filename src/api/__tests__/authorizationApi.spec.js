jest.enableAutomock();
jest.unmock('../authorizationApi.js');
const authorizationApi = require('../authorizationApi.js');
const apiUtils = require("../apiUtils");

describe("authorization api", () => {
  describe("registerUser", () => {
    it("should call apiUtils", () => {
      //given
      jest.spyOn(apiUtils, 'callApiService');

      //when
      authorizationApi.registerUser({
        email: 'a@a.com'
      });

      //then
      expect(apiUtils.callApiService).toBeCalledWith('POST', 'company/register', {
        email: 'a@a.com'
      }, false);
    });
  });
});
