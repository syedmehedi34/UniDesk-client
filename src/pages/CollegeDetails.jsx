/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaStar,
  FaCalendarAlt,
  FaFlask,
  FaImages,
  // FaSparkles,
  FaTrophy,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

import useUniversities from "../hooks/useUniversities";
import Loader from "../components/Loader";

const CollegeDetails = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  const { collegeId } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    // Simulate fetching college by ID; replace with API call in a real app
    const foundCollege = universities.find((c) => c._id === collegeId);
    setCollege(foundCollege);
  }, [collegeId, universities]);

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  // Animation for gallery images and items
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  if (!college) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-50 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex items-end justify-between p-8">
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              {college.name}
            </h1>
            <Link to={`/admission/${college._id}`}>
              <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg">
                Apply Now <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-10 space-y-12">
          {/* Basic Info */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaFlask className="h-7 w-7 text-blue-500 mr-3" />
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 flex items-center text-lg">
                <FaMapMarkerAlt className="h-6 w-6 text-red-500 mr-3" />
                <span className="font-medium">Location:</span>{" "}
                {college.location}
              </p>
              <p className="text-gray-700 flex items-center text-lg">
                <FaStar className="h-6 w-6 text-yellow-400 mr-3" />
                <span className="font-medium">Rating:</span> {college.rating}/5
              </p>
              <p className="text-gray-700 flex items-center text-lg">
                <FaCalendarAlt className="h-6 w-6 text-green-500 mr-3" />
                <span className="font-medium">Admission Period:</span>{" "}
                {college.admissionDates.start} to {college.admissionDates.end}
              </p>
              <p className="text-gray-700 flex items-center text-lg">
                <FaFlask className="h-6 w-6 text-blue-500 mr-3" />
                <span className="font-medium">Research Works:</span>{" "}
                {college.numberOfResearchWorks}
              </p>
            </div>
          </motion.div>

          {/* Gallery Images */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaImages className="h-7 w-7 text-purple-500 mr-3" />
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {college.galleryImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img || "https://via.placeholder.com/150"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Events Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaCalendarAlt className="h-6 w-6 text-green-500 mr-3" />
              Events
            </h2>
            <div className="space-y-6">
              {college.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaCalendarAlt className="h-6 w-6 text-green-500 mr-3" />
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <p className="text-gray-700 mt-2">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sports Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaTrophy className="h-7 w-7 text-orange-500 mr-3" />
              Sports
            </h2>
            <div className="space-y-6">
              {college.sports.map((sport, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaTrophy className="h-6 w-6 text-orange-500 mr-3" />
                    {sport.name}
                  </h3>
                  <p className="text-gray-700 mt-2">{sport.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaGlobe className="h-7 w-7 text-teal-500 mr-3" />
              Additional Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaEnvelope className="h-6 w-6 text-blue-500 mr-3" />
                  Contact
                </h3>
                <p className="text-gray-700 flex items-center mt-3 text-lg">
                  <FaEnvelope className="h-6 w-6 text-blue-500 mr-3" />
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${college.contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {college.contact.email}
                  </a>
                </p>
                <p className="text-gray-700 flex items-center mt-2 text-lg">
                  <FaPhone className="h-6 w-6 text-green-500 mr-3" />
                  <span className="font-medium">Phone:</span>{" "}
                  {college.contact.phone}
                </p>
                <p className="text-gray-700 flex items-center mt-2 text-lg">
                  <FaGlobe className="h-6 w-6 text-teal-500 mr-3" />
                  <span className="font-medium">Website:</span>{" "}
                  <a
                    href={college.contact.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {college.contact.website}
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaDollarSign className="h-6 w-6 text-green-500 mr-3" />
                  Tuition
                </h3>
                <p className="text-gray-700 flex items-center mt-3 text-lg">
                  <GoDotFill size={15} />
                  <span className="font-medium ml-2">Undergraduate:</span> $
                  {college.tuition.undergraduate.toLocaleString()}
                </p>
                <p className="text-gray-700 flex items-center mt-2 text-lg">
                  <GoDotFill size={15} />
                  <span className="font-medium ml-2">Graduate:</span> $
                  {college.tuition.graduate.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CollegeDetails;

// images, and college names. admission process, events details, research works, and sports categories in a detailed way.
// events” and “sports” facilities.

// admission route ->
