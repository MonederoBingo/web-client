jest.enableAutomock();
jest.unmock('../../../src/api/apiUtils');
const apiUtils = require("../../../src/api/apiUtils");

describe("api utils", () => {
  beforeEach(function () {
    fetch.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({ok: true, json: () => {}});
      });
    });
  });
  describe("callApiService", () => {
    it("should return a promise", () => {
        //when
        let result = apiUtils.callApiService();

        //then
        expect(typeof result.then === "function").toBe(true);
    });
    it("should call service to get xsrf token if document.cookie is null", () => {
        //given
        document.cookie = null;

        //when
        let result = apiUtils.callApiService();

        //then
        expect(fetch).toBeCalled();
    });
  });
});
