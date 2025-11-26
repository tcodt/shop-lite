import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/getAllUsers";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};
