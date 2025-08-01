/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import collegeData from "../data/collegeData.js";

const CollegePage = () => {
  const [colleges, setColleges] = useState([]);
  //   console.log(collegeData);

  useEffect(() => {
    // Simulating data fetch; in a real app, this would be an API call
    setColleges(collegeData);
  }, []);

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
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Discover Our Colleges
      </h1>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college, index) => (
            <motion.div
              key={college._id}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {college.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Rating:</span>{" "}
                  {college.rating}/5
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Admission Period:</span>{" "}
                  {college.admissionDates.start} to {college.admissionDates.end}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Research Works:</span>{" "}
                  {college.numberOfResearchWorks}
                </p>
                <Link
                  to={`${college._id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                >
                  Details
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
