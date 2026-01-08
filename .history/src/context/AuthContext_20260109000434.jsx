import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (savedUser) {
      setUser(savedUser);
    }
    setLoading(false);
  }, []);

  /* ================= LOGIN ================= */
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

  /* ================= SIGNUP ================= */
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
      enrolledCourses: [],
      joinedDate: new Date().toISOString(),
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

    return {
      success: true,
      message: "Account created successfully",
    };
  };

  /* ================= COMMON UPDATE ================= */
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

  /* ================= PROFILE UPDATE ================= */
  const updateProfile = (updatedData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    updateUser(updatedUser);
  };

  /* ================= ENROLL COURSE (🔥 FIXED) ================= */
  const enrollCourse = (courseData) => {
    if (!user) return;

    const alreadyEnrolled = user.enrolledCourses.some(
      (c) => c.title === courseData.title
    );

    if (alreadyEnrolled) return;

    const enrolledCourse = {
      id: courseData.title.toLowerCase().replace(/\s+/g, ""),
      title: courseData.title,
      duration: courseData.duration,

      // ✅ STUDENT DETAILS
      studentName: courseData.studentName,
      email: courseData.email,
      phone: courseData.phone,
      age: courseData.age,

      enrolledAt:
        courseData.enrolledAt || new Date().toISOString(),
    };

    const updatedUser = {
      ...user,
      enrolledCourses: [
        ...user.enrolledCourses,
        enrolledCourse,
      ],
    };

    updateUser(updatedUser); // 🔥 VERY IMPORTANT
  };

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
        enrollCourse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);