import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [isScrolled, setIsScrolled] = useState(false); // Scroll state for blur

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll for blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/40 backdrop-blur-lg shadow-md"
          : "bg-navbar text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              UniDesk
            </Link>
          </div>

          {/* Middle: Nav Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`hover:text-blue-300 transition ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/colleges"
              className={`hover:text-blue-300 transition ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Colleges
            </Link>
            <Link
              to="/admission"
              className={`hover:text-blue-300 transition ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              Admission
            </Link>
            {user && (
              <Link
                to="/my-college"
                className={`hover:text-blue-300 transition ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              >
                My College
              </Link>
            )}
          </div>

          {/* Right: Auth Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`hover:text-blue-300 font-bold transition ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {user.displayName || user.email}
                </Link>
                <button
                  onClick={logOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`hover:text-blue-300 transition ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`hover:text-blue-300 transition ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <Link to="/" onClick={toggleMenu} className="hover:text-blue-300">
              Home
            </Link>
            <Link
              to="/colleges"
              onClick={toggleMenu}
              className="hover:text-blue-300"
            >
              Colleges
            </Link>
            <Link
              to="/admission"
              onClick={toggleMenu}
              className="hover:text-blue-300"
            >
              Admission
            </Link>
            {user && (
              <Link
                to="/my-college"
                onClick={toggleMenu}
                className="hover:text-blue-300"
              >
                My College
              </Link>
            )}
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={toggleMenu}
                  className="hover:text-blue-300"
                >
                  {user.displayName || user.email}
                </Link>
                <button
                  onClick={() => {
                    logOut();
                    toggleMenu();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="hover:text-blue-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMenu}
                  className="hover:text-blue-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
