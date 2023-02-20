import {
  CREATE_TOGGLE_DATA,
  GET_TOGGLE_DATA,
  GET_USERID_BY_TOGGLE_DATA,
  LOADING,
} from "./toggleType";

const initialState = {
  data: [],
  loading: false,
};

export default function toggleReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TOGGLE_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case GET_TOGGLE_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case GET_USERID_BY_TOGGLE_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case LOADING:
      return {
        ...state,
        loading: action.playload,
      };

    default:
      return state;
  }
}
