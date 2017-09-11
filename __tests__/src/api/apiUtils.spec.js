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
    it("should call test service to get xsrf token if document.cookie is null", () => {
        //given
        document.cookie = null;

        //when
        let result = apiUtils.callApiService();

        //then
        expect(fetch).toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});
    });
    it("should call test service to get xsrf token if document has no XSRF-TOKEN cookie", () => {
        //given
        document.cookie = "JSESSIONID=1234;";

        //when
        let result = apiUtils.callApiService();

        //then
        expect(fetch).toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});
    });
    it("should not call test service to get xsrf token if document has XSRF-TOKEN cookie", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        let result = apiUtils.callApiService();

        //then
        expect(fetch).not.toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});

    });
  });
});
