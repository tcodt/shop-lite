import { useQuery } from "@tanstack/react-query";
import { getUserCarts } from "../services/getUserCarts";

export const useGetUserCarts = (id: number) => {
  return useQuery({
    queryKey: ["user-carts", id],
    queryFn: () => getUserCarts(id),
  });
};
