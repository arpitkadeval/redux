import { USERCHECK } from "./userCheckType";

const initialState = {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case USERCHECK:
      return action.payload;
    default:
      return state;
  }
}
