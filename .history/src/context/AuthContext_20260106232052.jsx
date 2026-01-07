import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

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
      enrolledCourses: 0,
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
     (Navbar auto refresh)
  ======================== */
  const updateProfile = (updatedData) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser); // 🔥 Navbar updates instantly
  };

  /* =======================
     ENROLL COURSE
  ======================== */
  const enrollCourse = () => {
    const updatedUser = {
      ...user,
      enrolledCourses: (user.enrolledCourses || 0) + 1,
    };

    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
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
        login,
        signup,
        logout,
        updateProfile,
        enrollCourse,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   USE AUTH HOOK
======================== */
export const useAuth = () => useContext(AuthContext);