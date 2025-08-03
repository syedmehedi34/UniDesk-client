/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import useUniversities from "../hooks/useUniversities";
import useAdmissionModal from "../hooks/useAdmissionModal";
import AdmissionModal from "../components/AdmissionModal";
import Loader from "../components/Loader";
import { useAuth } from "../providers/AuthProvider";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AdmissionPage = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [universities, isLoadingUniversities] = useUniversities();
  const [userData, isLoadingUserData, userDataRefetch] = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [error, setError] = useState(null);
  const {
    isModalOpen,
    openModal,
    closeModal,
    formData,
    handleInputChange,
    handleSubmit,
    selectedUniversity,
  } = useAdmissionModal();

  // Fetch applications for the current user
  const userEmail = user ? user.email : null;
  useEffect(() => {
    const fetchApplications = async () => {
      if (userEmail) {
        setIsLoadingApplications(true);
        try {
          const response = await axiosPublic.get("/applications", {
            params: { studentEmail: userEmail },
          });
          setApplications(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error("Error fetching applications:", err);
          setError("Failed to load applications. Please try again later.");
          setApplications([]);
        } finally {
          setIsLoadingApplications(false);
        }
      }
    };
    fetchApplications();
  }, [userEmail, axiosPublic]);

  // Filter universities based on search term
  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Loading state
  if (isLoadingUniversities || isLoadingApplications) {
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

        {/* Error Display */}
        {error && <div className="text-center text-red-500 mb-6">{error}</div>}

        {/* University Cards */}
        <div className="space-y-6">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university, index) => {
              // Check if the user has already applied to this university
              const hasApplied = applications.some(
                (app) => app.universityId === university._id
              );

              return (
                <motion.div
                  key={university._id}
                  variants={cardVariants}
                  custom={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 flex justify-between items-center"
                >
                  <div>
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
                  </div>
                  <div>
                    {user ? (
                      <button
                        onClick={() => {
                          if (!hasApplied) {
                            openModal(university);
                          }
                        }}
                        className={`inline-flex items-center px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
                          hasApplied
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={hasApplied}
                        title={
                          hasApplied
                            ? "You have already applied to this university."
                            : ""
                        }
                      >
                        {hasApplied ? "Applied" : "Apply Now"}
                        <FaArrowRight className="ml-2" />
                      </button>
                    ) : (
                      <button
                        onClick={() => alert("Please log in to apply")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 cursor-not-allowed opacity-50"
                        title="You must be logged in to apply"
                      >
                        Apply Now
                        <FaArrowRight className="ml-2" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-600 text-center">
              No universities found matching your search.
            </p>
          )}
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

export default AdmissionPage;
