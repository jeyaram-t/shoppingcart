export const isAuthenticated = () => localStorage.getItem("accessToken") ? true : false;
