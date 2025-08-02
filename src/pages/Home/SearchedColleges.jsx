/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaStar,
  FaGraduationCap,
  FaDollarSign,
  FaLink,
} from "react-icons/fa";
import { Link } from "react-router";

// Animation variants for the card
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: {
    scale: 1.05,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.3 },
  },
};

const SearchedColleges = ({ searchedCollegesList }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Searched Colleges
      </h1>
      {searchedCollegesList.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No colleges found. Try a different search query.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedCollegesList.map((college) => (
            <motion.div
              key={college._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* College Image */}
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                {/* College Name */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {college.name}
                </h2>

                {/* Location */}
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  <p className="text-gray-600">{college.location}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <FaStar className="text-yellow-400 mr-2" />
                  <p className="text-gray-600">Rating: {college.rating} / 5</p>
                </div>

                {/* Programs */}
                <div className="flex items-center mb-3">
                  <FaGraduationCap className="text-green-500 mr-2" />
                  <div>
                    <p className="text-gray-600 font-medium">Programs:</p>
                    <ul className="list-disc list-inside text-gray-600">
                      {college.programs.map((program, index) => (
                        <li key={index}>
                          {program.name} ({program.degreeType},{" "}
                          {program.duration})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tuition */}
                <div className="flex items-center mb-3">
                  <FaDollarSign className="text-purple-500 mr-2" />
                  <p className="text-gray-600">
                    Tuition: Undergraduate $
                    {college.tuition.undergraduate.toLocaleString()} | Graduate
                    ${college.tuition.graduate.toLocaleString()}
                  </p>
                </div>

                {/* Website Link */}
                <div className="flex items-center justify-between">
                  <Link to={`/colleges/${college._id}`}>
                    <button className="btn bg-teal-600 rounded-4xl text-white">
                      View Details
                    </button>
                  </Link>

                  <div className="flex items-center">
                    <FaLink className="text-blue-500 mr-2" />

                    <a
                      href={college.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchedColleges;
