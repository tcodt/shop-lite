import api from "@/api/client";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "@/shared/types/auth";

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", {
    username: credentials.username,
    password: credentials.password,
  });
  return response.data;
};

export const register = async (userData: RegisterRequest) => {
  const response = await api.post("/users/add", userData);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};
