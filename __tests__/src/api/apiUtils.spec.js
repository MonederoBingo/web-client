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
        return apiUtils.callApiService().then(() => {

          //then
          expect(fetch).toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});
        });
    });
    it("should call test service to get xsrf token if document has no XSRF-TOKEN cookie", () => {
        //given
        document.cookie = "JSESSIONID=1234;";

        //when
        return apiUtils.callApiService().then(() => {
          //then
          expect(fetch).toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});
        });
    });
    it("should return error if call to test service to get xsrf token fails", () => {
        //given
        document.cookie = "JSESSIONID=1234;";
        fetch.mockImplementation(() => {
          return new Promise((resolve, reject) => {
            reject('timeout');
          });
        });

        //when
        return apiUtils.callApiService().catch((error) => {
          //then
          expect(error.toString()).toMatch('error.retrieving.xsrf.token -> timeout');
        });
    });
    it("should not call test service to get xsrf token if document has XSRF-TOKEN cookie", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService().then(() => {

          //then
          expect(fetch).not.toBeCalledWith('http://localhost:9090/test', {credentials: 'include'});
        });
    });
    it("should call api service using path from parameter", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('POST', 'myPath').then(() => {

          //then
          expect(fetch.mock.calls[0][0]).toEqual('http://localhost:9090/myPath');
        });
    });
    it("should call api service using method from parameter", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('POST', 'myPath').then(() => {

          //then
          expect(fetch.mock.calls[0][1].method).toEqual('POST');
        });
    });
    it("should call api service including credentials", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('POST', 'myPath').then(() => {

          //then
          expect(fetch.mock.calls[0][1].credentials).toEqual('include');
        });
    });
    it("should call api service not including body if method is GET", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('GET', 'myPath').then(() => {

          //then
          expect(fetch.mock.calls[0][1].body).toBeUndefined();
        });
    });
    it("should call service including body from parameter", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).then(() => {

          //then
          expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({body: "content"}));
        });
    });
    it("should call service including content type header", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).then(() => {

          //then
          expect(fetch.mock.calls[0][1].headers.get("Content-Type")).toEqual("application/json");
        });
    });
    it("should call service including xsrf header", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).then(() => {

          //then
          expect(fetch.mock.calls[0][1].headers.get("X-XSRF-TOKEN")).toEqual("123456");
        });
    });
  });
});
