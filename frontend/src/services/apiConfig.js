const fallbackApiBaseUrl = "https://ez-write.onrender.com";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || fallbackApiBaseUrl;
