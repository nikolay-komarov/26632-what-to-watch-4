import {extend} from "../../utils/utils.js";
import {
  AppPage,
} from "../../utils/const.js";


const initialState = {
  currentAppPage: AppPage.MAIN_PAGE,
};

const ActionType = {
  CHANGE_CURRENT_APP_PAGE: `CHANGE_CURRENT_APP_PAGE`,
};

const ActionCreator = {
  changeAppPage: (appPage) => ({
    type: ActionType.CHANGE_CURRENT_APP_PAGE,
    payload: appPage,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CURRENT_APP_PAGE:
      return extend(state, {
        currentAppPage: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
