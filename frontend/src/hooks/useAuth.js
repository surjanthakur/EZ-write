import { useState } from "react";
import { signupUser, loginUser } from "../services/authServices";
import { useAuthContext } from "../context/authContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { get_currUser } = useAuthContext();

  // signup
  const signup = async (data) => {
    setLoading(true);
    try {
      const res = await signupUser(data);
      if (!res.ok) {
        return res;
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  // login
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      if (!res.ok) {
        return res;
      }
      get_currUser();
      return res;
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    login,
    loading,
    authError,
  };
};
