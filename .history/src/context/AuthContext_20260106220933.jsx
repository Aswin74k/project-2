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
      return {
        success: false,
        message: "User already exists with this email!",
      };
    }

    users.push(data);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(data));
    setUser(data);

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  // 🔥🔥🔥 ADD THIS
  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };

    // update state → navbar refresh
    setUser(updatedUser);

    // update logged user
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    // update registered users list
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );
  };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateProfile, // 🔥 expose
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);