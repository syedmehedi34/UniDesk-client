/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../providers/AuthProvider";
import { motion } from "framer-motion";

const Header = ({ onSearch }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass search query to parent (e.g., Home)
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white min-h-[50vh] flex items-center justify-center py-12">
      {/* Background Overlay (Optional Image) */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Link
            to="/"
            className="text-5xl md:text-6xl font-extrabold tracking-tight"
          >
            UniDesk
          </Link>
        </motion.div>

        {/* Welcome Message */}
        <motion.p
          variants={itemVariants}
          className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto"
        >
          {user
            ? `Welcome back, ${user.displayName || user.email}!`
            : "Discover Your Dream College with UniDesk"}
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for a college..."
              className="w-full px-6 py-4 rounded-full bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 transition text-lg"
              aria-label="Search colleges"
            />
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </motion.div>

        {/* Hero Content Below Search */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col items-center gap-6"
        >
          <p className="text-lg md:text-xl max-w-lg mx-auto">
            Explore top colleges, book facilities, and join vibrant communities.
          </p>
          <Link
            to="/colleges"
            className="inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition transform hover:-translate-y-1"
          >
            Explore Colleges
          </Link>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
