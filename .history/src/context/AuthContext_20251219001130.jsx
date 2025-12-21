import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 🔁 Load user on refresh
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) setUser(savedUser);
  }, []);

  /* ================= LOGIN ================= */
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

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
      message: `Welcome back, ${foundUser.firstName} 👋`,
    };
  };

  /* ================= SIGNUP ================= */
  const signup = (data) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === data.email)) {
      return { success: false, message: "Email already exists" };
    }

    users.push(data);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    localStorage.setItem("loggedInUser", JSON.stringify(data));
    setUser(data);

    return {
      success: true,
      message: "Account created successfully 🎉",
    };
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
