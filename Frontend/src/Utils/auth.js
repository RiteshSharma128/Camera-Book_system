



import API from "./api";
export default API;
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user from localStorage
export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    return null;
  }
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout user (clear storage + redirect)
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/login";
};
