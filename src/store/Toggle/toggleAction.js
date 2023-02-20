import { API_URL } from "../../api/config";
import { apiClient } from "../../api/general";
import {
  GET_TOGGLE_DATA,
  GET_USERID_BY_TOGGLE_DATA,
  LOADING,
} from "./toggleType";

export const createToggleData = (Data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "POST",
      url: `${API_URL.toggle.createToggle}`,
      data: Data,
    })
      .then((response) => {
        resolve(response.data);
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

export const getToggleData = () => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "GET",
      url: `${API_URL.toggle.getAllToggle}`,
    })
      .then((response) => {
        dispatch({
          type: GET_TOGGLE_DATA,
          payload: response.data,
        });
        resolve(response.data);
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

export const getByUserIdToggleData = (userId) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "GET",
      url: `${API_URL.toggle.getByUserIdToggle + "/" + userId}`,
    })
      .then((response) => {
        dispatch({
          type: GET_USERID_BY_TOGGLE_DATA,
          payload: response.data,
        });
        resolve(response.data);
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

export const editOneToggleData = (Data, _Id) => async (dispatch) => {
  console.log(Data, _Id);

  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "PUT",
      url: `${API_URL.toggle.EditToggleData}/${_Id}`,
      data: Data,
    })
      .then((response) => {
        resolve(response.data);
        dispatch(getToggleData());
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

export const DeleteToggleData = (_Id) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: LOADING,
      payload: true,
    });
    apiClient({
      method: "DELETE",
      url: `${API_URL.toggle.DeleteToggle}/${_Id}`,
    })
      .then((response) => {
        resolve(response.data);
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
