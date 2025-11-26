import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth";
import toast from "react-hot-toast";
import { storage } from "@/shared/utils/token-storage";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";

export const useRegister = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
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

      toast.success("Welcome to Shop Lite");
      navigate("/dashboard", { replace: true });
    },
    onError: (error: AxiosError) => {
      toast.error("failed! Please check your credentials.");
      console.log("Register faild: ", error);
    },
  });
};
