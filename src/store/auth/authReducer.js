import {
  LOADING,
  LOGIN_USER,
  LOGOUT_USER,
  MODE_HANDLER,
  TOKEN_USER_DATA_HANDLER,
} from "./authType";
import { defaultAxios } from "../../api/general";

const initialState = {
  token: localStorage.getItem("token") || "",
  data: null,
  loading: false,
  mode: localStorage.getItem("mode") || "dark",
};

if (initialState.token)
  defaultAxios.defaults.headers.common["Authorization"] =
    "Bearer " + initialState.token;

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload?.data?.type);
      defaultAxios.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload.token;
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.data.type,
        data: action.payload.data,
      };
    case TOKEN_USER_DATA_HANDLER:
      return {
        ...state,
        data: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      delete defaultAxios.defaults.headers.common["Authorization"];
      return {
        token: null,
        data: null,
      };
    case MODE_HANDLER:
      localStorage.setItem("mode", action.payload);
      return {
        ...state,
        mode: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
