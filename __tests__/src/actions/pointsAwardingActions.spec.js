jest.enableAutomock();
jest.unmock('../../../src/actions/pointsAwardingActions.js');
const pointsAwardingActions = require('../../../src/actions/pointsAwardingActions.js');
const pointsAwardingApi = require('../../../src/api/pointsAwardingApi');
const ajaxStatusActions = require('../../../src/actions/ajaxStatusActions');
let mockedDispatch;

describe("points awarding actions", () => {
  beforeEach(function () {
      mockedDispatch = jest.fn();
      ajaxStatusActions.ajaxCallError.mockReturnValueOnce({type: 'BEGIN_AJAX_ERROR'});
      ajaxStatusActions.beginAjaxCall.mockReturnValueOnce({type: 'BEGIN_AJAX_CALL'});
      pointsAwardingApi.awardPoints.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve({success: true});
        });
      });
  });
  describe("award points", () => {
    it("should return a function", () => {
      //when
      let result = pointsAwardingActions.awardPoints();

      //then
      expect(typeof result === "function").toBe(true);
    });
    describe("returned function", () => {
        let returnedFunction = pointsAwardingActions.awardPoints();
        it("should return a promise", () => {
              //when
              let result = returnedFunction(mockedDispatch);

              //then
              expect(typeof result.then === "function").toBe(true);
        });
        it("should dispatch begin ajax call action", () => {
              //when
              returnedFunction(mockedDispatch);

              //then
              expect(mockedDispatch).toBeCalledWith({type: 'BEGIN_AJAX_CALL'});
        });
        it("should call award points api", () => {
              //given
              jest.spyOn(pointsAwardingApi, 'awardPoints');
              returnedFunction = pointsAwardingActions.awardPoints({phone: '555'});

              //when
              returnedFunction(mockedDispatch);

              //then
              expect(pointsAwardingApi.awardPoints).toBeCalledWith({phone: '555'});
        });
        it("should dispatch ajax call error action if api returns service result success false", () => {
              //given
              pointsAwardingApi.awardPoints.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                  resolve({success: false});
                });
              });

              //when
              return returnedFunction(mockedDispatch).then(serviceResult => {

                //then
                expect(mockedDispatch).toBeCalledWith({type: 'BEGIN_AJAX_ERROR'});
              });
        });
        it("should not dispatch ajax call error action if api returns service result success true", () => {
              //given
              pointsAwardingApi.awardPoints.mockImplementation(() => {
                return new Promise((resolve, reject) => {
                  resolve({success: true});
                });
              });

              //when
              return returnedFunction(mockedDispatch).then(serviceResult => {

                //then
                expect(mockedDispatch).not.toBeCalledWith({type: 'BEGIN_AJAX_ERROR'});
              });
        });
    });
  });
});
