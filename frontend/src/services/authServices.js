import axios from "axios";

const API_URL = axios.create({
  baseURL: "http://localhost:8000/api/v1.0/users",
  withCredentials: true,
});

// api call for signup user
const signupUser = async (data) => {
  const res = await API_URL.post("/signup", data);
  return { status: res.status, data: res.data };
};

// api call for login user
const LoginUser = async (data) => {
  try {
    const res = await API_URL.post("/login", data);
    return { status: res.status, data: res.data, ok: true };
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data ?? {};
    const rawDetail = data?.detail ?? data?.message;
    const detail =
      typeof rawDetail === "string"
        ? rawDetail
        : Array.isArray(rawDetail)
          ? rawDetail
              .map((m) => (typeof m === "string" ? m : m?.msg || m))
              .join(", ")
          : "Login failed";
    return { status, data, ok: false, detail };
  }
};

// api call to get current user
const CurrentUser = async () => {
  const res = await API_URL.get("/me");
  return { status: res.status, data: res.data };
};

export { signupUser, LoginUser, CurrentUser };
