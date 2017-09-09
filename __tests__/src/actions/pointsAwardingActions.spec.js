const pointsAwardingActions = require("../../../src/actions/pointsAwardingActions.js");
const ajaxStatusActions = require('../../../src/actions/ajaxStatusActions');
const mockedDispatch = jest.fn();

describe("points awarding actions", () => {
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
              console.log(mockedDispatch.mock.calls[1][0]);
              expect(mockedDispatch.mock.calls[0][0]).toEqual({type: 'BEGIN_AJAX_CALL'});
        });
    });
  });
});
