import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password" };
    }

    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    setUser(foundUser);

    return {
      success: true,
      message: `Welcome back, ${foundUser.firstName}`,
    };
  };

  const signup = (data) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === data.email)) {
      return { success: false, message: "User already exists!" };
    }

    users.push(data);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(data));
    setUser(data);

    return { success: true, message: "Account created" };
  };

  // 🔥 THIS IS THE IMPORTANT PART
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);