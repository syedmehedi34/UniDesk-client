/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useUniversities from "../hooks/useUniversities.jsx";

const CollegePage = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  // console.log(universities);

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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
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

  if (!universities?.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">No colleges found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Discover Our Colleges
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((college, index) => (
            <motion.div
              key={college._id || index}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={college.image || "/fallback-image.jpg"}
                alt={`${college.name} campus`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {college.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Rating:</span>{" "}
                  {college.rating || "N/A"}/5
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Admission Period:</span>{" "}
                  {college.admissionDates?.start || "N/A"} to{" "}
                  {college.admissionDates?.end || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Research Works:</span>{" "}
                  {college.numberOfResearchWorks || 0}
                </p>
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
        </div>
      </div>
    </div>
  );
};

export default CollegePage;
