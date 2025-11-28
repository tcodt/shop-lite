import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "../services/getSingleUser";

export const useGetSingleUser = (id: number) => {
  return useQuery({
    queryKey: ["single-user"],
    queryFn: () => getSingleUser(id),
  });
};
