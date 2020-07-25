import {reducer, ActionType, ActionCreator} from "./state.js";
import {
  AppPage,
} from "../../utils/const.js";

describe(`State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentAppPage: AppPage.MAIN_PAGE,
    });
  });

  it(`Reducer should change currentAppPage to MoviPage`, () => {
    expect(reducer({
      currentAppPage: AppPage.MAIN_PAGE,
    }, {
      type: ActionType.CHANGE_CURRENT_APP_PAGE,
      payload: AppPage.MOVIE_PAGE,
    })).toEqual({
      currentAppPage: AppPage.MOVIE_PAGE,
    });
  });
});

describe(`State ActionCreator tests`, () => {
  it(`ActionCreator for changeAppPage return correct action`, () => {
    expect(ActionCreator.changeAppPage(AppPage.MOVIE_PAGE)).toEqual({
      type: ActionType.CHANGE_CURRENT_APP_PAGE,
      payload: AppPage.MOVIE_PAGE,
    });
  });
});
