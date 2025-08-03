/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
  MapPinIcon,
  CalendarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const modalVariants = {
  hidden: { scale: 0.9, opacity: 0, y: 20 },
  visible: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 20 },
};

const ReviewModal = ({ isOpen, closeModal, university, onReviewAdded }) => {
  const axiosPublic = useAxiosPublic();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userData] = useUsers();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewDetails = {
      studentName: userData?.name || "Anonymous",
      studentEmail: userData?.email || "",
      universityName: university?.name || "Unknown University",
      universityLocation: university?.location || "Unknown Location",
      rating,
      comment,
      universityId: university?._id,
      createdAt: new Date().toISOString(),
    };

    try {
      // Send data to backend
      const res = await axiosPublic.post("/reviews", reviewDetails);
      if (res.status === 200) {
        toast.success("Review submitted successfully!");
        // Call the callback to update reviews in parent component
        onReviewAdded({
          ...reviewDetails,
          _id: res.data._id || Date.now().toString(), // Use server-provided _id or fallback
        });
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review. Please try again.");
    }

    setRating(0);
    setComment("");
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
              {university && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {university.name}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                    {university.location}
                  </p>
                  <p className="text-gray-600 flex items-center mt-2">
                    <CalendarIcon className="h-5 w-5 text-green-500 mr-2" />
                    Deadline: {university.admissionDates.start} to{" "}
                    {university.admissionDates.end}
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
  );
};

export default ReviewModal;
