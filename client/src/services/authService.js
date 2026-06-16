import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

const authService = {

  register: async (
    userData
  ) => {
    const response =
      await axios.post(
        `${API}/register`,
        userData
      );

    return response.data;
  },

  login: async (
    credentials
  ) => {
    const response =
      await axios.post(
        `${API}/login`,
        credentials
      );

    return response.data;
  },

  forgotPassword:
    async (email) => {
      const response =
        await axios.post(
          `${API}/forgot-password`,
          { email }
        );

      return response.data;
    },

  resetPassword:
    async (
      token,
      password
    ) => {
      const response =
        await axios.post(
          `${API}/reset-password`,
          {
            token,
            password
          }
        );

      return response.data;
    },

  getProfile:
    async (token) => {
      const response =
        await axios.get(
          `${API}/profile`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      return response.data;
    }
};

export default authService;