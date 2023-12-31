import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: baseUrl,
});

// Use axios interceptors to alter requests before they are sent
api.interceptors.request.use(
  config => {
    // Retrieve the persisted users from local storage
    const persistedUser = localStorage.getItem("persist:user");
    let token;

    if (persistedUser) {
      const user = JSON.parse(persistedUser);
      if (user.token) {
        token = user.token.replace(/^"|"$/g, "");
      }
    }
    if (token) {
      // Add the token to the request headers
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
