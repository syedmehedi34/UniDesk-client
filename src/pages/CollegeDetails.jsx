/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } },
  };

  // Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
  };

  if (!college || isLoadingUniversities) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{college.name}</h1>
              <p className="text-gray-200">{college.location}</p>
            </div>
            <button
              onClick={() => openModal(college)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
            >
              Apply Now <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Overview */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-gray-600 flex items-center">
                <FaStar className="h-4 w-4 text-yellow-500 mr-2" />
                Rating: {college.rating}/5
              </p>
              <p className="text-gray-600 flex items-center">
                <FaCalendarAlt className="h-4 w-4 text-blue-500 mr-2" />
                Admission: {college.admissionDates.start} -{" "}
                {college.admissionDates.end}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaFlask className="h-4 w-4 text-blue-500 mr-2" />
                Research Works: {college.numberOfResearchWorks}
              </p>
              <p className="text-gray-600 flex items-center">
                <FaUsers className="h-4 w-4 text-blue-500 mr-2" />
                Enrollment: {college.enrollment.undergraduate.toLocaleString()}{" "}
                (UG), {college.enrollment.graduate.toLocaleString()} (G)
              </p>
            </div>
          </motion.div>

          {/* Programs */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Programs
            </h2>
            <div className="space-y-4">
              {college.programs.map((program, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaBook className="h-4 w-4 text-blue-500 mr-2" />
                    {program.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Degree: {program.degreeType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {program.duration}
                  </p>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Admission Process
            </h2>
            <p className="text-gray-600">{college.admissionProcess}</p>
          </motion.div>

          {/* Facilities */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Facilities
            </h2>
            <div className="space-y-4">
              {college.facilities.map((facility, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaBuilding className="h-4 w-4 text-blue-500 mr-2" />
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {facility.description}
                  </p>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Research History
            </h2>
            <div className="space-y-4">
              {college.researchHistory.map((research, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaBook className="h-4 w-4 text-blue-500 mr-2" />
                    {research.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Authors: {research.authors.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Published: {research.publicationDate}
                  </p>
                  <a
                    href={research.link}
                    className="text-blue-600 hover:underline text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Research
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sports */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Sports
            </h2>
            <div className="space-y-4">
              {college.sports.map((sport, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaTrophy className="h-4 w-4 text-blue-500 mr-2" />
                    {sport.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{sport.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Events */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Events
            </h2>
            <div className="space-y-4">
              {college.events.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaCalendarAlt className="h-4 w-4 text-blue-500 mr-2" />
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600">Date: {event.date}</p>
                  <p className="text-gray-600 text-sm">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Reviews */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Reviews
            </h2>
            <div className="space-y-4">
              {college.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FaStar className="h-4 w-4 text-yellow-500 mr-2" />
                    Rating: {review.rating}/5
                  </h3>
                  <p className="text-sm text-gray-600">Date: {review.date}</p>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Details */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Additional Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Contact
                </h3>
                <p className="text-gray-600 flex items-center text-sm">
                  <FaEnvelope className="h-4 w-4 text-blue-500 mr-2" />
                  <a
                    href={`mailto:${college.contact.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {college.contact.email}
                  </a>
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2">
                  <FaPhone className="h-4 w-4 text-blue-500 mr-2" />
                  {college.contact.phone}
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2">
                  <FaGlobe className="h-4 w-4 text-blue-500 mr-2" />
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tuition
                </h3>
                <p className="text-gray-600 flex items-center text-sm">
                  <GoDotFill className="h-4 w-4 mr-2" />
                  Undergraduate: $
                  {college.tuition.undergraduate.toLocaleString()}
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2">
                  <GoDotFill className="h-4 w-4 mr-2" />
                  Graduate: ${college.tuition.graduate.toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Social Media
                </h3>
                <p className="text-gray-600 flex items-center text-sm">
                  <FaFacebook className="h-4 w-4 text-blue-600 mr-2" />
                  <a
                    href={college.socialMedia.facebook}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Facebook
                  </a>
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2">
                  <FaTwitter className="h-4 w-4 text-blue-400 mr-2" />
                  <a
                    href={college.socialMedia.twitter}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </p>
                <p className="text-gray-600 flex items-center text-sm mt-2">
                  <FaInstagram className="h-4 w-4 text-pink-500 mr-2" />
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

          {/* Campus Location */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Campus Location
            </h2>
            <p className="text-gray-600 text-sm mb-4">
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
