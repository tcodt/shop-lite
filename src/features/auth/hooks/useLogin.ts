import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/features/auth/services/auth";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import { storage } from "@/shared/utils/token-storage";
import { useNavigate } from "react-router";
import { useAuth } from "@/features/auth/contexts/AuthContext";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      storage.setTokens(data.accessToken, data.refreshToken);

      const safeUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      };

      storage.setUser(safeUser);
      setUser(safeUser);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Welcome back!");
      navigate("/", { replace: true });
    },
    onError: (error: AxiosError) => {
      toast.error("Login failed. Please check your credentials.");
      console.log("Login faild: ", error);
    },
  });
};
