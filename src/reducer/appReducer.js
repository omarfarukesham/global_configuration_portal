/* eslint-disable no-unused-vars */
export const initialAppState = {
  isSidebarCollapsed: false,
};

/* Action Types */
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';

/* Action Creators */
export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};
export const closeSidebar = () => {
  return {
    type: CLOSE_SIDEBAR,
  };
};

/* Reducer */
const appReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed,
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isSidebarCollapsed: false,
      };
    default:
      return state;
  }
};

export default appReducer;
