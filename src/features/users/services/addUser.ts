import api from "@/api/client";
import type { RegisterRequest } from "@/shared/types/auth";

export const addUser = async (userData: RegisterRequest) => {
  const response = await api.post("/users/add", userData);
  return response.data;
};
