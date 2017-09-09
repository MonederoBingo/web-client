describe("points awarding actions", () => {

jest.enableAutomock();
jest.unmock('../../../src/actions/pointsAwardingActions.js');
const pointsAwardingActions = require('../../../src/actions/pointsAwardingActions.js');
const pointsAwardingApi = require('../../../src/api/pointsAwardingApi');
const ajaxStatusActions = require('../../../src/actions/ajaxStatusActions');
const mockedDispatch = jest.fn();

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
              //given
              ajaxStatusActions.beginAjaxCall = jest.fn();
              ajaxStatusActions.beginAjaxCall.mockReturnValueOnce({type: 'BEGIN_AJAX_CALL'});

              //when
              returnedFunction(mockedDispatch);

              //then
              expect(mockedDispatch).toBeCalledWith({type: 'BEGIN_AJAX_CALL'});
        });
        it("should call award points api", () => {
              //given
              jest.spyOn(pointsAwardingApi, 'awardPoints');
              let dispatcher = pointsAwardingActions.awardPoints({phone: '555'});

              //when
              dispatcher(mockedDispatch);

              //then
              expect(pointsAwardingApi.awardPoints).toBeCalledWith({phone: '555'});
        });
    });
  });
});
