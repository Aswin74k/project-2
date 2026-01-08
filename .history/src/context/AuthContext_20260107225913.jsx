import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Initial load (page refresh)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (storedUser) {
      // 🛡️ Safety fixes for old users
      const fixedUser = {
        enrolledCourses: [],
        joinedDate: new Date().toISOString(),
        ...storedUser
      };

      setUser(fixedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(fixedUser));
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = (email, password) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid credentials" };
    }

    // 🛡️ Fix missing fields (IMPORTANT)
    const fixedUser = {
      enrolledCourses: [],
      joinedDate: new Date().toISOString(),
      ...foundUser
    };

    setUser(fixedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(fixedUser));

    return {
      success: true,
      message: `Welcome back, ${fixedUser.firstName}`
    };
  };

  // 📝 SIGNUP
  const signup = (data) => {
    const users =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (users.some((u) => u.email === data.email)) {
      return {
        success: false,
        message: "User already exists with this email"
      };
    }

    const newUser = {
      ...data,
      enrolledCourses: [],
      joinedDate: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(newUser)
    );

    setUser(newUser);

    return { success: true };
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  // ✏️ UPDATE PROFILE (edit sidebar)
  const updateProfile = (data) => {
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    // update in registeredUsers also
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

  // 📚 ENROLL COURSE
  const enrollCourse = (course) => {
    if (!user) return;

    const alreadyEnrolled = user.enrolledCourses?.some(
      (c) => c.id === course.id
    );

    if (alreadyEnrolled) return;

    const updatedUser = {
      ...user,
      enrolledCourses: [...(user.enrolledCourses || []), course]
    };

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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        enrollCourse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Custom hook
export const useAuth = () => useContext(AuthContext);