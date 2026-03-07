import { useContext, createContext, useState, useEffect } from "react";
import { CurrentUser } from "../services/authServices";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [authLoader, setAuthLoader] = useState(true);

  const get_currUser = async () => {
    try {
      const res = await CurrentUser();
      if (res.ok) {
        setCurrUser(res.data);
      } else {
        setCurrUser(null);
      }
      return res;
    } catch (error) {
      setCurrUser(null);
      throw error;
    } finally {
      setAuthLoader(false);
    }
  };

  useEffect(() => {
    get_currUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, get_currUser, authLoader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
