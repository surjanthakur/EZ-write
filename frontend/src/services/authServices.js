import axios from "axios";
import { apiBaseUrl } from "./apiConfig";

const api = axios.create({
  baseURL: `${apiBaseUrl}/api/users`,
  withCredentials: true,
});

// error handler
const handleApiError = (err) => {
  const data = err.response?.data;
  const rawDetail = data?.detail ?? data?.message;
  const detail =
    typeof rawDetail === "string"
      ? rawDetail
      : Array.isArray(rawDetail)
        ? rawDetail
            .map((message) =>
              typeof message === "string" ? message : message?.msg
            )
            .join(", ")
        : "Something went wrong";

  return { ok: false, error_msg: detail };
};

const request_handler = async (func) => {
  try {
    const res = await func();
    return {
      ok: true,
      status: res.status,
      data: res.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

export const signupUser = async (data) => {
  return await request_handler(() => api.post("/signup", data));
};

export const loginUser = async (data) => {
  return await request_handler(() => api.post("/login", data));
};

export const currentUser = async () => {
  return await request_handler(() => api.get("/me"));
};

export const logoutUser = async () => {
  return await request_handler(() => api.post("/logout"));
};
