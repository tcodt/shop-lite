import type { User } from "@/types/auth";

export const storage = {
  getAccessToken: (): string | null => localStorage.getItem("access_token"),
  getRefreshToken: (): string | null => localStorage.getItem("refresh_token"),
  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  setTokens: (accessToken: string, refreshToken?: string) => {
    localStorage.setItem("access_token", accessToken);
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
  },
  setUser: (user: User) => localStorage.setItem("user", JSON.stringify(user)),

  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },
};
