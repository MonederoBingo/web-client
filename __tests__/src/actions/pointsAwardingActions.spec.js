jest.enableAutomock();
import * as pointsAwardingActions from '../../../src/actions/pointsAwardingActions.js';
import * as ajaxStatusActions from '../../../src/actions/ajaxStatusActions';
import * as pointsAwardingApi from '../../../src/api/pointsAwardingApi';

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
              expect(mockedDispatch).toBeCalledWith({type: 'BEGIN_AJAX_CALL'});
        });
        it("should call award points api", () => {
              //given
              pointsAwardingApi.awardPoints = jest.fn();
              let dispatcher = pointsAwardingActions.awardPoints({phone: '555'});

              //when
              dispatcher(mockedDispatch);

              //then
              expect(pointsAwardingApi.awardPoints).toBeCalledWith({phone: '555'});
        });
    });
  });
});
