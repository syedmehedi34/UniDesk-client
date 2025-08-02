/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaStar,
  FaGraduationCap,
  FaDollarSign,
  FaLink,
  FaBook,
} from "react-icons/fa";
import useUniversities from "../hooks/useUniversities.jsx";

const CollegePage = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  const [searchQuery, setSearchQuery] = useState("");

  // Compute filtered universities using useMemo to avoid redundant calculations
  const filteredUniversities = useMemo(() => {
    if (!universities) return [];
    return universities.filter((college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, universities]);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-200">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4" />
        <div className="h-8 bg-blue-300 rounded-full w-24" />
      </div>
    </div>
  );

  if (isLoadingUniversities) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Discover Our Colleges
        </h1>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Discover Our Colleges
      </h1>
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search colleges by name..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        {filteredUniversities.length === 0 && searchQuery ? (
          <p className="text-center text-gray-600 text-lg">
            No colleges found for "{searchQuery}". Try a different search query.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredUniversities.map((college, index) => (
                <motion.div
                  key={college._id || index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  variants={cardVariants}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  {/* College Image */}
                  <img
                    src={college.image || "/fallback-image.jpg"}
                    alt={`${college.name} campus`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    {/* College Name */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {college.name}
                    </h2>
                    {/* Location */}
                    <div className="flex items-center mb-3">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <p className="text-gray-600">{college.location}</p>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <FaStar className="text-yellow-400 mr-2" />
                      <p className="text-gray-600">
                        Rating: {college.rating || "N/A"} / 5
                      </p>
                    </div>
                    {/* Admission Dates */}
                    <div className="flex items-center mb-3">
                      <FaBook className="text-indigo-500 mr-2" />
                      <p className="text-gray-600">
                        Admission: {college.admissionDates?.start || "N/A"} to{" "}
                        {college.admissionDates?.end || "N/A"}
                      </p>
                    </div>
                    {/* Number of Research Works */}
                    <div className="flex items-center mb-3">
                      <FaBook className="text-indigo-500 mr-2" />
                      <p className="text-gray-600">
                        Research Works: {college.numberOfResearchWorks || 0}
                      </p>
                    </div>
                    {/* Tuition */}
                    <div className="flex items-center mb-3">
                      <FaDollarSign className="text-purple-500 mr-2" />
                      <p className="text-gray-600">
                        Tuition: Undergraduate $
                        {college.tuition?.undergraduate?.toLocaleString() ||
                          "N/A"}{" "}
                        | Graduate $
                        {college.tuition?.graduate?.toLocaleString() || "N/A"}
                      </p>
                    </div>
                    {/* View Details Link */}
                    <Link
                      to={`/colleges/${college._id}`}
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                      aria-label={`View details for ${college.name}`}
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegePage;
