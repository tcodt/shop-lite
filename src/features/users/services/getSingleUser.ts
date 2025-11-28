import api from "@/api/client";
import type { UserObj } from "../types";

export const getSingleUser = async (id: number): Promise<UserObj> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
