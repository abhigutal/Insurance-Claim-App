import axios from "axios";

const API =
  "http://localhost:5000/api/auth";

export const googleLogin = async (data) => {

  const response = await axios.post(
    `${API}/google-login`,
    { token: data.credential }
  );
  return response.data;
};

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
    userData
  ) => {
    const response =
      await axios.post(
        `${API}/login`,
        userData
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