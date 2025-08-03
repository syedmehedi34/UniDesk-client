/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import useAxiosPublic from "../../hooks/useAxiosPublic";

// Skeleton loader component for reviews
const SkeletonReviewCard = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse min-w-[300px] mx-2">
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-full mb-4" />
      <div className="h-8 bg-blue-300 rounded-full w-24" />
    </div>
  </div>
);

const CollegeReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosPublic.get("/all-reviews");
        const sortedReviews = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (error) {
        // console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [axiosPublic]);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            College Reviews
          </h2>
          <div className="flex items-center">
            <button
              onClick={scrollLeft}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 mr-4"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory"
            >
              {[...Array(3)].map((_, index) => (
                <SkeletonReviewCard key={index} />
              ))}
            </div>
            <button
              onClick={scrollRight}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 ml-4"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            College Reviews
          </h2>
          <p className="text-xl text-gray-600 text-center">No reviews found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          College Reviews
        </h2>
        <div className="flex items-center">
          <button
            onClick={scrollLeft}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 mr-4"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory"
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden min-w-[300px] mx-2 snap-center"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {review.universityName}
                  </h3>

                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Reviewer:</span>{" "}
                    {review.studentName}
                  </p>
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-sm text-gray-600 mr-2">
                      Rating:
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{review.comment}</p>
                  <Link
                    to={`/colleges/${review.universityId}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    aria-label={`View details for ${review.universityName}`}
                  >
                    View College
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 ml-4"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CollegeReviews;
