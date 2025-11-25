// src/api/client.ts
import axios from "axios";
import { storage } from "@/shared/utils/token-storage";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

// === درخواست: اضافه کردن توکن ===
api.interceptors.request.use((config) => {
  const token = storage.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// === پاسخ: مدیریت 401 و Refresh Token ===
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // فقط اگه 401 بود و قبلاً امتحان نکرده بودیم
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // اگه یکی دیگه داره ریفرش می‌کنه → صبر کن
      if (isRefreshing) {
        while (isRefreshing) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const newToken = storage.getAccessToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest); // دوباره بزن
          }
        }
        return Promise.reject(error);
      }

      // اگه اولین نفر بودی → خودت ریفرش کن
      isRefreshing = true;

      try {
        const refreshToken = storage.getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        // مهم! از axios خام استفاده کن (نه api) تا لوپ نشه
        const response = await axios.post(
          "https://dummyjson.com/auth/refresh",
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // ذخیره توکن‌های جدید
        storage.setTokens(accessToken, newRefreshToken || refreshToken);

        // درخواست اصلی رو با توکن جدید دوباره بزن
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // اگه ریفرش هم شکست → واقعاً لاگ‌اوت شو
        storage.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        // این خط حیاتیه!
        isRefreshing = false;
      }
    }

    // اگه خطای دیگه‌ای بود (400, 500, ...) → همونو برگردون
    return Promise.reject(error);
  }
);

export default api;
