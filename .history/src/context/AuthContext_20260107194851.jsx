import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

/* =======================
   AUTH PROVIDER
======================= */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =======================
     LOAD USER ON REFRESH
  ======================== */
  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  /* =======================
     LOGIN
  ======================== */
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

  /* =======================
     SIGNUP
  ======================== */
  const signup = (data) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === data.email)) {
      return {
        success: false,
        message: "User already exists with this email!",
      };
    }

    const newUser = {
      ...data,
      enrolledCourses: [], // ✅ ARRAY (VERY IMPORTANT)
      joinedDate: new Date().toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
    };

    users.push(newUser);

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(users)
    );
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  /* =======================
     UPDATE PROFILE
  ======================== */
  const updateProfile = (updatedData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    updateUser(updatedUser);
  };

  /* =======================
     UPDATE USER (CORE FUNCTION)
     🔥 Used for Enroll, Edit, etc.
  ======================== */
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

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

  /* =======================
     LOGOUT
  ======================== */
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
        updateProfile,
        updateUser, // 🔥 IMPORTANT
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   USE AUTH HOOK
======================= */
export const useAuth = () => useContext(AuthContext);