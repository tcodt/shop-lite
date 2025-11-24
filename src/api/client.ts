import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

api.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }
);

export default api;
