import {
  LOGIN_USER,
  LOGOUT_USER,
  LOADING,
  TOKEN_USER_DATA_HANDLER,
  MODE_HANDLER,
} from "./authType";
import { API_URL } from "../../api/config";
import { apiClient } from "../../api/general";

export const login = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.auth.login}`,
      data,
    })
      .then((response) => {
        resolve(response.data);
        dispatch({
          type: LOGIN_USER,
          payload: {
            token: response.token,
            data: response.data,
          },
        });
      })
      .catch((error) => {
        reject(error);
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  });
};

export const tokenUserData = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.auth.tokenUser}`,
      data,
    })
      .then((response) => {
        resolve(response.data);
        dispatch({
          type: TOKEN_USER_DATA_HANDLER,
          payload: response.data,
        });
      })
      .catch((error) => {
        reject(error);
        console.log("Error", error);
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  });
};

export const logout = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "POST",
      url: `${API_URL.auth.logout}`,
    })
      .then((response) => {
        dispatch({
          type: LOGOUT_USER,
          payload: {},
        });
        resolve(response);
      })
      .catch((error) => {
        dispatch(error.message);
        reject(error);
      });
  });
};

export const modeHanlder = (data) => async (dispatch) => {
  dispatch({
    type: MODE_HANDLER,
    payload: data,
  });
};
