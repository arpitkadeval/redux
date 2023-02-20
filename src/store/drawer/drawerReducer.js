import { TOGGLEDRAWER } from "./drawerType";

const initialState = {
  collapsed: false,
  isOpen: false,
};

export default function drawer(state = initialState, action) {
  switch (action.type) {
    case TOGGLEDRAWER:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
}
