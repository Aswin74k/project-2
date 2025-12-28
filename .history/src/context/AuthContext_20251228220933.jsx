import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /* -------------------------------
     Load user from localStorage
  -------------------------------- */
  useEffect(() => {
    const storedUser = localStorage.getItem("techmentorUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* -------------------------------
     LOGIN
  -------------------------------- */
  const login = (email, password) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("techmentorUsers")) || [];

    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    setUser(foundUser);
    localStorage.setItem("techmentorUser", JSON.stringify(foundUser));

    return { success: true, message: `Welcome ${foundUser.firstName}` };
  };

  /* -------------------------------
     SIGNUP
  -------------------------------- */
  const signup = (data) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("techmentorUsers")) || [];

    const userExists = storedUsers.some(
      (u) => u.email === data.email
    );

    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const newUser = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };

    storedUsers.push(newUser);
    localStorage.setItem(
      "techmentorUsers",
      JSON.stringify(storedUsers)
    );

    setUser(newUser);
    localStorage.setItem(
      "techmentorUser",
      JSON.stringify(newUser)
    );

    return { success: true, message: "Account created successfully" };
  };

  /* -------------------------------
     LOGOUT
  -------------------------------- */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("techmentorUser");
  };

  /* -------------------------------
     UPDATE PROFILE (CRUD - Update)
  -------------------------------- */
  const updateProfile = (updatedData) => {
    const storedUsers =
      JSON.parse(localStorage.getItem("techmentorUsers")) || [];

    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? { ...u, ...updatedData } : u
    );

    localStorage.setItem(
      "techmentorUsers",
      JSON.stringify(updatedUsers)
    );

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem(
      "techmentorUser",
      JSON.stringify(updatedUser)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* -------------------------------
   Custom Hook
-------------------------------- */
export function useAuth() {
  return useContext(AuthContext);
}