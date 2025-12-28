import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔹 Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔹 LOGIN
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setUser(foundUser);
    localStorage.setItem("user", JSON.stringify(foundUser));

    return { success: true, message: `Welcome ${foundUser.firstName}` };
  };

  // 🔹 SIGNUP
  const signup = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === data.email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      profilePic: "", // 👈 profile image
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));

    return { success: true, message: "Account created successfully" };
  };

  // 🔹 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🔹 UPDATE PROFILE (CRUD – Update)
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🔹 Custom hook
export const useAuth = () => useContext(AuthContext);