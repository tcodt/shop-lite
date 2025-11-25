import { getMe } from "@/services/auth/auth";
import { storage } from "@/utils/token-storage";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!storage.getAccessToken,
    staleTime: 1000 * 60 * 10, // 10 minute
  });
};
