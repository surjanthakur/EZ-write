import { useContext, createContext, useState, useEffect } from "react";
import { CurrentUser } from "../services/authServices";

export const AuthContext = createContext({
  currUser: null,
  get_currUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);

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
    }
  };

  useEffect(() => {
    get_currUser();
  }, []);

  return (
    <AuthContext.Provider value={{ currUser, get_currUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
