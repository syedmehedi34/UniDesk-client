/* eslint-disable no-unused-vars */
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import useAdmissionApplications from "../hooks/useAdmissionApplications";
import useUniversities from "../hooks/useUniversities";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  BuildingLibraryIcon,
  MapPinIcon,
  CalendarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

const MyCollegeDetails = () => {
  const { _id } = useParams();
  const [userColleges] = useAdmissionApplications();
  const [universities] = useUniversities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const selectedApplication = userColleges?.find((item) => item._id === _id);
  const selectedUniversity = universities?.find(
    (uni) => uni._id === selectedApplication?.universityId
  );

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  if (!selectedApplication) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Application not found.
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Placeholder for review submission logic
    console.log("Review submitted:", { rating, comment });
    setIsModalOpen(false);
    setRating(0);
    setComment("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setComment("");
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-12 bg-white p-8 shadow-2xl rounded-2xl border border-gray-100 mb-20"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-6">
        <img
          src={selectedApplication.image}
          alt="Candidate"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-100 shadow"
        />
        <h2 className="text-3xl font-semibold text-gray-800">
          {selectedApplication.candidateName}
        </h2>
        <p className="text-gray-500">{selectedApplication.subject}</p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Candidate Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mt-6 space-y-4 text-gray-700 text-sm md:text-base">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <DetailItem
              icon={<EnvelopeIcon className="h-5 w-5 text-blue-600" />}
              label="Email"
              value={selectedApplication.candidateEmail}
            />
            <DetailItem
              icon={<PhoneIcon className="h-5 w-5 text-green-600" />}
              label="Phone"
              value={selectedApplication.candidatePhone}
            />
            <DetailItem
              icon={<AcademicCapIcon className="h-5 w-5 text-purple-600" />}
              label="Subject"
              value={selectedApplication.subject}
            />
            <DetailItem
              icon={<MapPinIcon className="h-5 w-5 text-orange-600" />}
              label="Address"
              value={selectedApplication.address}
            />
            <DetailItem
              icon={<CalendarIcon className="h-5 w-5 text-yellow-600" />}
              label="Date of Birth"
              value={selectedApplication.dateOfBirth}
            />
            <DetailItem
              icon={<CalendarIcon className="h-5 w-5 text-teal-600" />}
              label="Submitted On"
              value={selectedApplication.applicationSubmitted}
            />
          </div>
        </motion.div>

        {/* University Details */}
        {selectedUniversity && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {selectedUniversity.name}
            </h3>
            <div className="space-y-4 text-gray-700 text-sm md:text-base">
              <DetailItem
                icon={
                  <BuildingLibraryIcon className="h-5 w-5 text-indigo-600" />
                }
                label="University"
                value={selectedApplication.universityName}
              />
              <DetailItem
                icon={<StarIcon className="h-5 w-5 text-yellow-500" />}
                label="Rating"
                value={`${selectedUniversity.rating}/5`}
              />
              <DetailItem
                icon={<MapPinIcon className="h-5 w-5 text-rose-600" />}
                label="Location"
                value={selectedUniversity.location}
              />
              <DetailItem
                icon={<CalendarIcon className="h-5 w-5 text-teal-600" />}
                label="Admission Dates"
                value={`${selectedUniversity.admissionDates.start} to ${selectedUniversity.admissionDates.end}`}
              />
              <DetailItem
                icon={<EnvelopeIcon className="h-5 w-5 text-blue-600" />}
                label="Contact Email"
                value={selectedUniversity.contact.email}
              />
              <DetailItem
                icon={<PhoneIcon className="h-5 w-5 text-green-600" />}
                label="Contact Phone"
                value={selectedUniversity.contact.phone}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Review Button */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Add Review
        </button>
      </motion.div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
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
                    Submit a Review
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>

                {/* University Information */}
                {selectedUniversity && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {selectedUniversity.name}
                    </h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                      {selectedUniversity.location}
                    </p>
                    <p className="text-gray-600 flex items-center mt-2">
                      <CalendarIcon className="h-5 w-5 text-green-500 mr-2" />
                      Deadline: {
                        selectedUniversity.admissionDates.start
                      } to {selectedUniversity.admissionDates.end}
                    </p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className="focus:outline-none"
                        >
                          {star <= rating ? (
                            <StarSolidIcon className="h-6 w-6 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-6 w-6 text-gray-300" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
                      rows="5"
                      placeholder="Share your experience..."
                      required
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
                      disabled={rating === 0}
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

// Reusable component for display rows
const DetailItem = ({ icon, label, value }) => (
  <motion.div
    className="flex items-start gap-3"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <p className="text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800">{value}</p>
    </div>
  </motion.div>
);

export default MyCollegeDetails;
