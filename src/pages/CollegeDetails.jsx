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
  FaTrophy,
  FaEnvelope,
  FaPhone,
  FaGlobe,
  FaDollarSign,
  FaArrowRight,
  FaBook,
  FaBuilding,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import L from "leaflet"; // For custom marker icon

import useUniversities from "../hooks/useUniversities";
import Loader from "../components/Loader";
import useAdmissionModal from "../hooks/useAdmissionModal";
import AdmissionModal from "../components/AdmissionModal";

// Fix for default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CollegeDetails = () => {
  const {
    isModalOpen,
    selectedUniversity,
    formData,
    handleInputChange,
    handleSubmit,
    openModal,
    closeModal,
  } = useAdmissionModal();

  const [universities, isLoadingUniversities] = useUniversities();
  const { collegeId } = useParams();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    const foundCollege = universities.find((c) => c._id === collegeId);
    setCollege(foundCollege);
  }, [collegeId, universities]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
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
            <button
              onClick={() => openModal(college)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
            >
              Apply Now <FaArrowRight className="ml-2" />
            </button>
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
              <p className="text-gray-700 flex items-center text-lg">
                <FaUsers className="h-6 w-6 text-purple-500 mr-3" />
                <span className="font-medium">
                  Enrollment:
                </span> Undergraduate:{" "}
                {college.enrollment.undergraduate.toLocaleString()}, Graduate:{" "}
                {college.enrollment.graduate.toLocaleString()}
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

          {/* Campus Location with Leaflet Map */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaMapMarkerAlt className="h-7 w-7 text-red-500 mr-3" />
              Campus Location
            </h2>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4 text-lg">
                <span className="font-medium">Address:</span>{" "}
                {college.campusLocation.address}
              </p>
              <div style={mapContainerStyle}>
                <MapContainer
                  center={[
                    college.campusLocation.location.lat,
                    college.campusLocation.location.lng,
                  ]}
                  zoom={15}
                  style={mapContainerStyle}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      college.campusLocation.location.lat,
                      college.campusLocation.location.lng,
                    ]}
                  >
                    <Popup>{college.name}</Popup>
                  </Marker>
                </MapContainer>
              </div>
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

          {/* Research History */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaBook className="h-7 w-7 text-blue-500 mr-3" />
              Research History
            </h2>
            <div className="space-y-6">
              {college.researchHistory.map((research, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaBook className="h-6 w-6 text-blue-500 mr-3" />
                    {research.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Authors:</span>{" "}
                    {research.authors.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Publication Date:</span>{" "}
                    {research.publicationDate}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <a
                      href={research.link}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Research
                    </a>
                  </p>
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

          {/* Admission Process */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaBook className="h-7 w-7 text-blue-500 mr-3" />
              Admission Process
            </h2>
            <div className="p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-700 text-lg">
                {college.admissionProcess}
              </p>
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaStar className="h-7 w-7 text-yellow-400 mr-3" />
              Reviews
            </h2>
            <div className="space-y-6">
              {college.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaStar className="h-6 w-6 text-yellow-400 mr-3" />
                    Rating: {review.rating}/5
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Date:</span> {review.date}
                  </p>
                  <p className="text-gray-700 mt-2">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Facilities */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaBuilding className="h-7 w-7 text-teal-500 mr-3" />
              Facilities
            </h2>
            <div className="space-y-6">
              {college.facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaBuilding className="h-6 w-6 text-teal-500 mr-3" />
                    {facility.name}
                  </h3>
                  <p className="text-gray-700 mt-2">{facility.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <FaBook className="h-7 w-7 text-blue-500 mr-3" />
              Programs
            </h2>
            <div className="space-y-6">
              {college.programs.map((program, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  variants={itemVariants}
                  custom={index}
                >
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FaBook className="h-6 w-6 text-blue-500 mr-3" />
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Degree Type:</span>{" "}
                    {program.degreeType}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Duration:</span>{" "}
                    {program.duration}
                  </p>
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
              <div>
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <FaFacebook className="h-6 w-6 text-blue-600 mr-3" />
                  Social Media
                </h3>
                <p className="text-gray-700 flex items-center mt-3 text-lg">
                  <FaFacebook className="h-6 w-6 text-blue-600 mr-3" />
                  <a
                    href={college.socialMedia.facebook}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </p>
                <p className="text-gray-700 flex items-center mt-2 text-lg">
                  <FaTwitter className="h-6 w-6 text-blue-400 mr-3" />
                  <a
                    href={college.socialMedia.twitter}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </p>
                <p className="text-gray-700 flex items-center mt-2 text-lg">
                  <FaInstagram className="h-6 w-6 text-pink-500 mr-3" />
                  <a
                    href={college.socialMedia.instagram}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Instagram
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AdmissionModal
        isModalOpen={isModalOpen}
        selectedUniversity={selectedUniversity}
        closeModal={closeModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </motion.div>
  );
};

export default CollegeDetails;
