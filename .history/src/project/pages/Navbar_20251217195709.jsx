import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const Navbar = () => {
  const { user, logout } = useLibrary();

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Library</Link>
      <div>
        {user ? (
          <>
            <span className="text-white me-3">Hi, {user.name}</span>
            <button onClick={logout} className="btn btn-danger btn-sm">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-light" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
