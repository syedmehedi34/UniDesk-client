/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Calendar,
  FlaskConical,
  Image,
  Sparkles,
  Trophy,
  Mail,
  Phone,
  Globe,
  DollarSign,
} from "lucide-react";
import useUniversities from "../hooks/useUniversities";

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

  // Animation for gallery images and icons
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
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <h1 className="text-4xl font-extrabold text-white p-6">
              {college.name}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {/* Basic Info */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FlaskConical className="h-6 w-6 text-blue-600 mr-2" />
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-gray-700 flex items-center">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">Location:</span>{" "}
                {college.location}
              </p>
              <p className="text-gray-700 flex items-center">
                <Star className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">Rating:</span> {college.rating}
                /5
              </p>
              <p className="text-gray-700 flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">Admission Period:</span>{" "}
                {college.admissionDates.start} to {college.admissionDates.end}
              </p>
              <p className="text-gray-700 flex items-center">
                <FlaskConical className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold">Research Works:</span>{" "}
                {college.numberOfResearchWorks}
              </p>
            </div>
          </motion.div>
          {/* Gallery Images */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Image className="h-6 w-6 text-blue-600 mr-2" />
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {college.galleryImages.map((img, index) => (
                <motion.img
                  key={index}
                  src={img || "https://via.placeholder.com/150"}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg"
                  variants={itemVariants}
                  custom={index}
                />
              ))}
            </div>
          </motion.div>
          {/* /* Events Section */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
              Events
            </h2>
            <div className="space-y-4">
              {college.events.map((event, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <p className="text-gray-700">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* /* Sports Section  */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Trophy className="h-6 w-6 text-blue-600 mr-2" />
              Sports
            </h2>
            <div className="space-y-4">
              {college.sports.map((sport, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Trophy className="h-5 w-5 text-blue-600 mr-2" />
                    {sport.name}
                  </h3>
                  <p className="text-gray-700">{sport.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* /* Additional Info */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="h-6 w-6 text-blue-600 mr-2" />
              Additional Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  Contact
                </h3>
                <p className="text-gray-700 flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href={`mailto:${college.contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {college.contact.email}
                  </a>
                </p>
                <p className="text-gray-700 flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Phone:</span>{" "}
                  {college.contact.phone}
                </p>
                <p className="text-gray-700 flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-2" />
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
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                  Tuition
                </h3>
                <p className="text-gray-700 flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Undergraduate:</span> $
                  {college.tuition.undergraduate.toLocaleString()}
                </p>
                <p className="text-gray-700 flex items-center">
                  <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Graduate:</span> $
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
