/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import useUniversities from "../hooks/useUniversities";
import Loader from "../components/Loader";

const AdmissionPage = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: null,
  });

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  // Filter universities based on search term
  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      university: {
        name: selectedUniversity.name,
        location: selectedUniversity.location,
        admissionDates: selectedUniversity.admissionDates,
      },
      formData,
    });
    setIsModalOpen(false);
    setFormData({
      candidateName: "",
      subject: "",
      candidateEmail: "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
      image: null,
    });
  };

  // Open modal with selected university
  const openModal = (university) => {
    setSelectedUniversity(university);
    setFormData((prev) => ({
      ...prev,
      subject: university.programs[0]?.name || "", // Default to first program
    }));
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
    setFormData({
      candidateName: "",
      subject: "",
      candidateEmail: "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
      image: null,
    });
  };

  // Animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for each university card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  // Animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  // Loading state
  if (isLoadingUniversities) {
    return <Loader />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Find Your University
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search universities by name..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-700 placeholder-gray-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* University Cards */}
        <div className="space-y-6">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university, index) => (
              <motion.div
                key={university._id}
                variants={cardVariants}
                custom={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 truncate">
                  {university.name}
                </h2>
                <div className="mt-4 space-y-3">
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-red-500 mr-2" />
                    {university.location}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaCalendarAlt className="h-5 w-5 text-green-500 mr-2" />
                    <span className="font-semibold mr-1.5">Deadline:</span>{" "}
                    {university.admissionDates.start} to{" "}
                    {university.admissionDates.end}
                  </p>
                </div>
                <button
                  onClick={() => openModal(university)}
                  className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Apply Now <FaArrowRight className="ml-2" />
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-600 text-center">
              No universities found matching your search.
            </p>
          )}
        </div>
      </div>

      {/* Modal with Overlay */}
      <AnimatePresence>
        {isModalOpen && selectedUniversity && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            {/* Modal Content */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application Form
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                {/* College Information */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedUniversity.name}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="h-5 w-5 text-red-500 mr-2" />
                    {selectedUniversity.location}
                  </p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <FaCalendarAlt className="h-5 w-5 text-green-500 mr-2" />
                    Deadline: {selectedUniversity.admissionDates.start} to{" "}
                    {selectedUniversity.admissionDates.end}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      {selectedUniversity.programs.map((program, index) => (
                        <option key={index} value={program.name}>
                          {program.name} ({program.degreeType},{" "}
                          {program.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Candidate Email
                    </label>
                    <input
                      type="email"
                      name="candidateEmail"
                      value={formData.candidateEmail}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Candidate Phone Number
                    </label>
                    <input
                      type="tel"
                      name="candidatePhone"
                      value={formData.candidatePhone}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdmissionPage;
