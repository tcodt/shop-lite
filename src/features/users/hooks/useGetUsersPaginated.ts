import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { UsersApiResponse } from "../types";

const fetchUsers = async (page: number, search: string = "") => {
  const limit = 9;
  const skip = (page - 1) * limit;

  let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

  if (search.trim()) {
    url = `https://dummyjson.com/users/search?q=${encodeURIComponent(
      search
    )}&limit=${limit}&skip=${skip}`;
  }

  const response = await axios.get(url);
  if (!response) throw new Error("Failed to fetch users");
  return response.data as Promise<UsersApiResponse>;
};

export const useGetUsersPaginated = (page: number, search: string) => {
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: () => fetchUsers(page, search),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });
};
