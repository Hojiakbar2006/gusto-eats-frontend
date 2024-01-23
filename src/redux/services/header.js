export const authHeader = () => {
  return {
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "omit",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  };
};
