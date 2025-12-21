import { createContext, useContext, useState } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  // Auth state
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Books state
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books")) || []
  );

  // Register
  const register = (data) => {
    localStorage.setItem("registeredUser", JSON.stringify(data));
    return true;
  };

  // Login
  const login = (email, password) => {
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (
      savedUser &&
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("user", JSON.stringify(savedUser));
      setUser(savedUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Add book
  const addBook = (book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // Delete book
  const deleteBook = (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  return (
    <LibraryContext.Provider
      value={{ user, books, register, login, logout, addBook, deleteBook }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
