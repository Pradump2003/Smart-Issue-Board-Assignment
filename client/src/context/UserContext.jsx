import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/user/me`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setUser(null);
        setLoading(false); 
        return;
      }

      const data = await res.json();
      setUser(data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
