import api from "@/api/client";
import type { UsersApiResponse } from "../types";

export const getAllUsers = async (): Promise<UsersApiResponse> => {
  const response = await api.get("/users");
  return response.data;
};
