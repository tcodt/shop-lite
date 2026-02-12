import api from "@/api/client";
import type { UserCartsResponse } from "../types";

export const getUserCarts = async (
  id: number
): Promise<UserCartsResponse | undefined> => {
  try {
    const response = await api.get(`https://dummyjson.com/users/${id}/carts`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
