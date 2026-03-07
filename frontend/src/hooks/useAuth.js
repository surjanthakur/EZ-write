import { useState } from "react";
import { signupUser, LoginUser, CurrentUser } from "../services/authServices";

export const UseAuth = () => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // signup user hook
  const Signup = async (data) => {
    try {
      setLoading(true);
      setAuthError(null);
      const res = await signupUser(data);
      if (!res) {
        setAuthError(res?.detail || "Signup failed");
      }
      return res;
    } catch (err) {
      setAuthError(
        err.response?.data?.detail || "something went wrong try again"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // login user hook
  const Login = async (data) => {
    try {
      setLoading(true);
      setAuthError(null);
      const res = await LoginUser(data);
      const statusOk = res?.status >= 200 && res?.status < 300;
      if (!statusOk || !res?.ok) {
        const detail = res?.detail ?? res?.data?.message ?? "Login failed";
        setAuthError(detail);
        return { ok: false, detail };
      }
      return { ok: true, data: res };
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setAuthError(detail);
      return { ok: false, detail };
    } finally {
      setLoading(false);
    }
  };

  // curr user hook
  const CurrUser = async () => {
    try {
      const res = await CurrentUser();
      setIsCurrentUser(true);
      return res;
    } catch (err) {
      setAuthError(
        err.response?.data?.detail ||
          "you are not authenticated to access resource!"
      );
      setIsCurrentUser(false);
    }
  };
  return { Signup, Login, CurrUser, loading, authError, isCurrentUser };
};
