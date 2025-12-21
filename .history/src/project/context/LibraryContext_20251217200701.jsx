import { createContext, useState } from "react";

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // LOGIN
  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      localStorage.setItem("user", JSON.stringify(storedUser));
      return true;
    } else {
      return false;
    }
  };

  // REGISTER
  const register = (data) => {
    localStorage.setItem("registeredUser", JSON.stringify(data));
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <LibraryContext.Provider value={{ user, login, register, logout }}>
      {children}
    </LibraryContext.Provider>
  );
};
