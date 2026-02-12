import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../services/addUser";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User added successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: AxiosError) => {
      toast.error("Failed to add user. Please try again.");
      console.log("Add user failed: ", error);
    },
  });
};
