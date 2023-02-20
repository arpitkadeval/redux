import { USERCHECK } from "./userCheckType";
import { API_URL } from "../../api/config";
import { apiClient } from "../../api/general";

export const userCheck = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "get",
      url: `${API_URL.userCheck.userCheck}`,
    })
      .then((response) => {
        resolve(response.data);
        dispatch({
          type: USERCHECK,
          payload: response.data,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const breakIn = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "get",
      url: `${API_URL.userCheck.breakIn}`,
    })
      .then((response) => {
        if (response?.status === 200) {
          dispatch(userCheck());
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkIn = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "get",
      url: `${API_URL.userCheck.checkIn}`,
    })
      .then((response) => {
        if (response?.status === 200) {
          dispatch(userCheck());
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkOut = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "get",
      url: `${API_URL.userCheck.checkOut}`,
    })
      .then((response) => {
        if (response?.status === 200) {
          dispatch(userCheck());
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const breakOut = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient({
      method: "get",
      url: `${API_URL.userCheck.breakOut}`,
    })
      .then((response) => {
        if (response?.status === 200) {
          dispatch(userCheck());
        }
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
