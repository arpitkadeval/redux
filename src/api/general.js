import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultHeaders = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const option = {
  autoClose: 1000,
};

export const defaultAxios = axios.create({});

export function apiClient({
  url,
  data = {},
  method = "POST",
  headers = {},
  noHeaders,
  ...rest
}) {
  return new Promise((resolve, reject) => {
    defaultAxios({
      method,
      url,
      headers: {
        ...(noHeaders ? {} : defaultHeaders),
        ...headers,
      },
      data,
      ...rest,
    })
      .then((res) => {
        resolve(res.data);

        toast.success(res?.data?.message, option);
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          reject(err.response.data.error);
          if (err.response.data.statusCode === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("emailId");
            localStorage.removeItem("lastName");
            toast.error("Please Reload the Page and Login Again", option);
          } else {
            toast.error(err.response.data.message, option);
          }
        } else {
          reject(err);
        }
      });
  });
}
