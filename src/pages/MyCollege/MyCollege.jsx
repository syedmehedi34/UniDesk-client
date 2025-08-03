/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAdmissionApplications from "../../hooks/useAdmissionApplications";
import {
  BuildingLibraryIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const MyCollege = () => {
  const [userColleges, isLoading] = useAdmissionApplications();
  // console.log(userColleges);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        My College Applications
      </h1>

      {isLoading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : !Array.isArray(userColleges) || userColleges.length === 0 ? (
        <div className="text-center text-gray-600">
          No college applications found.
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {userColleges.map((college, index) => (
            <motion.div
              key={college._id + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md rounded-2xl p-6 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <img
                  src={college.image}
                  alt="Candidate"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {college.candidateName}
                  </h2>
                  <p className="text-sm text-gray-500">{college.subject}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="h-5 w-5 text-indigo-500" />
                  <span>
                    {college.universityName} - {college.universityLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="h-5 w-5 text-teal-500" />
                  <span>{college.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                  <span>{college.candidateEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="h-5 w-5 text-green-500" />
                  <span>{college.candidatePhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-rose-500" />
                  <span>{college.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-purple-500" />
                  <span>Date of Birth: {college.dateOfBirth}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-yellow-500" />
                  <span>Submitted: {college.applicationSubmitted}</span>
                </div>
              </div>

              <div className="mt-4 text-right">
                <Link
                  to={`/my-college/details/${college._id}`}
                  className="inline-block px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition duration-200"
                >
                  Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable component for display rows
const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </div>
);

export default MyCollege;
