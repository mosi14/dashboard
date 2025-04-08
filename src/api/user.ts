import API from "./api";

export const loginUser = (username: string, password: string) =>
  API.post("/auth/login", { username, password });

export const fetchProfile = () => API.get("/auth/me");

export const refreshTokenApi = (refreshToken: string) =>
  API.post("/auth/refresh", { refreshToken });
