import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Load logged-in user on refresh
  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  // 🔹 LOGIN
  const login = (email, password) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(foundUser)
    );
    setUser(foundUser);

    return {
      success: true,
      message: `Welcome back, ${foundUser.firstName}`,
    };
  };

  // 🔹 SIGNUP
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

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(data)
    );

    setUser(data);

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  // 🔹 UPDATE FIRST NAME (🔥 MAIN LOGIC 🔥)
  const updateUserFirstName = (firstName) => {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        firstName,
      };

      // update logged in user
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUser)
      );

      // update registered users
      const users =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      const updatedUsers = users.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );

      localStorage.setItem(
        "registeredUsers",
        JSON.stringify(updatedUsers)
      );

      return updatedUser; // 🔥 navbar auto re-render
    });
  };

  // 🔹 LOGOUT
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUserFirstName, // ✅ IMPORTANT
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);