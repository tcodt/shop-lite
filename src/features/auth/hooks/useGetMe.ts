import { getMe } from "@/features/auth/services/auth";
import { storage } from "@/shared/utils/token-storage";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!storage.getAccessToken,
    staleTime: 1000 * 60 * 10, // 10 minute
  });
};
