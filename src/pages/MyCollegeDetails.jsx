/* eslint-disable no-unused-vars */
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useAdmissionApplications from "../hooks/useAdmissionApplications";
import useUniversities from "../hooks/useUniversities";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ReviewModal from "../components/ReviewModal";
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

const MyCollegeDetails = () => {
  const { _id } = useParams();
  const [userColleges] = useAdmissionApplications();
  const [universities] = useUniversities();
  const [userData] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [error, setError] = useState(null);

  const selectedApplication = userColleges?.find((item) => item._id === _id);
  const selectedUniversity = universities?.find(
    (uni) => uni._id === selectedApplication?.universityId
  );

  // Fetch reviews for the selected university and user
  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedUniversity?._id && userData?.email) {
        setIsLoadingReviews(true);
        try {
          const response = await axiosPublic.get("/api/reviews", {
            params: {
              universityId: selectedUniversity?._id,
              studentEmail: userData?.email,
            },
          });
          setReviews(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error("Error fetching reviews:", err);
          setError("Failed to load reviews. Please try again later.");
          setReviews([]);
        } finally {
          setIsLoadingReviews(false);
        }
      }
    };
    fetchReviews();
  }, [
    selectedApplication?._id,
    userData?.email,
    axiosPublic,
    selectedUniversity?._id,
  ]);

  // Callback to handle new review submission
  const handleReviewAdded = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  if (!selectedApplication) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Application not found.
      </div>
    );
  }

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

      {/* Reviews Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          My Reviews
        </h3>
        {isLoadingReviews ? (
          <div className="text-center text-gray-600">Loading reviews...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-gray-600">No reviews found.</div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? (
                        <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <StarIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Submitted on:{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

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
      <ReviewModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        university={selectedUniversity}
        onReviewAdded={handleReviewAdded} // Pass the callback
      />
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
