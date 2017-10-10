jest.enableAutomock();
jest.unmock('../apiUtils');
const apiUtils = require("../apiUtils");

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
    it("should call service including authorization header", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";
        sessionStorage.setItem("access_token", "98765");

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).then(() => {

          //then
          expect(fetch.mock.calls[0][1].headers.get("Authorization")).toEqual("Bearer 98765");
        });
    });
    it("should not call service including authorization header if parameter is false", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";
        sessionStorage.setItem("access_token", "98765");

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}, false).then(() => {

          //then
          expect(fetch.mock.calls[0][1].headers.get("Authorization")).toBe(null);
        });
    });
    it("should not call service including xsrf header if parameter is false", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}, true, false).then(() => {

          //then
          expect(fetch.mock.calls[0][1].headers.get("X-XSRF-TOKEN")).toBe(null);
        });
    });
    it("should return error if call to api service returns error", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";
        fetch.mockImplementation(() => {
          return new Promise((resolve, reject) => {
            reject('timeout');
          });
        });

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).catch((error) => {

          //then
          expect(error.toString()).toMatch('timeout');
        });
    });
    it("should return json from api call response", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";
        fetch.mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({
              ok: true, json: () => {
              return "response_from_service";
              }
            });
          });
        });

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).then((response) => {

          //then
          expect(response).toMatch('response_from_service');
        });
    });
    it("should return error if api call response is not ok", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=123456;";
        fetch.mockImplementation(() => {
          return new Promise((resolve, reject) => {
            resolve({ok: false, json: () => {}});
          });
        });

        //when
        return apiUtils.callApiService('POST', 'myPath', {body: "content"}).catch((error) => {

          //then
          expect(error.toString()).toMatch('error.when.calling.api.server');
        });
    });
    const setHost = (host) => {
      Object.defineProperty(location, 'host', {
          value: host,
          configurable: true,
        });
    };
    it("should call api service in test.localhost environment", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";
        setHost("test.localhost:8080");

        //when
        return apiUtils.callApiService('POST', '').then(() => {

          //then
          expect(fetch.mock.calls[0][0]).toEqual('http://test.localhost:9090/');
        });
    });
    it("should call api service in prod environment", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";
        setHost("www.monederobingo.com");

        //when
        return apiUtils.callApiService('POST', '').then(() => {

          //then
          expect(fetch.mock.calls[0][0]).toEqual('http://prod.api.monederobingo.com/');
        });
    });
    it("should call api service in uat environment", () => {
        //given
        fetch.mockClear();
        document.cookie = "XSRF-TOKEN=1234;";
        setHost("test.monederobingo.com");

        //when
        return apiUtils.callApiService('POST', '').then(() => {

          //then
          expect(fetch.mock.calls[0][0]).toEqual('http://uat.api.monederobingo.com/');
        });
    });
    it("should return auth url for test.localhost env", () => {
        //given
        fetch.mockClear();
        document.cookie = "";
        setHost("test.localhost:8080");

        //when
        const authUrl = apiUtils.getAuthUrl();

        //then
        expect(authUrl).toEqual('http://test.localhost:9000/');
    });
    it("should return auth url for prod env", () => {
        //given
        fetch.mockClear();
        document.cookie = "";
        setHost("www.monederobingo.com");

        //when
        const authUrl = apiUtils.getAuthUrl();

        //then
        expect(authUrl).toEqual('http://prod.auth.monederobingo.com/');
    });
    it("should return auth url for uat env", () => {
        //given
        document.cookie = "";
        setHost("test.monederobingo.com");

        //when
        const authUrl = apiUtils.getAuthUrl();

        //then
        expect(authUrl).toEqual('http://prod.auth.monederobingo.com/');
    });
    it("should return cookie value", () => {
        //given
        document.cookie = "KEY1=1234";
        document.cookie = "KEY2=4556;";

        //when
        const cookieValue = apiUtils.getCookie("KEY2");

        //then
        expect(cookieValue).toEqual('4556');
    });
    it("should return null if cookie is not found", () => {
        //given
        document.cookie = "KEY1=1234";
        document.cookie = "KEY2=4556;";

        //when
        const cookieValue = apiUtils.getCookie("KEY3");

        //then
        expect(cookieValue).toBe(null);
    });
  });
});
