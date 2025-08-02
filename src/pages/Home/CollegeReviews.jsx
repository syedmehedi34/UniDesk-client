// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router";
// import {
//   StarIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/solid";

// // Sample hook to fetch reviews (replace with your actual API call)
// const useCollegeReviews = () => {
//   const [reviews, setReviews] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     // Simulate API call (replace with actual fetch to your backend)
//     setTimeout(() => {
//       setReviews([
//         {
//           id: 1,
//           collegeId: "college1",
//           collegeName: "Sunset University",
//           reviewerName: "Alice Johnson",
//           rating: 4.5,
//           reviewText:
//             "Sunset University offers an excellent academic environment with supportive faculty. The campus facilities are top-notch, especially the library and sports complex!",
//           createdAt: "2024-08-15",
//         },
//         {
//           id: 2,
//           collegeId: "college2",
//           collegeName: "Brighton College",
//           reviewerName: "Michael Chen",
//           rating: 4.0,
//           reviewText:
//             "Great community and diverse programs. The admission process was smooth, but I wish there were more research opportunities for undergraduates.",
//           createdAt: "2024-07-20",
//         },
//         {
//           id: 3,
//           collegeId: "college3",
//           collegeName: "Riverdale Institute",
//           reviewerName: "Sarah Patel",
//           rating: 3.8,
//           reviewText:
//             "Riverdale has a vibrant campus life with lots of events. However, some facilities need upgrading, and the advising could be more personalized.",
//           createdAt: "2024-06-10",
//         },
//         {
//           id: 4,
//           collegeId: "college4",
//           collegeName: "Oakwood Academy",
//           reviewerName: "David Lee",
//           rating: 4.2,
//           reviewText:
//             "Fantastic sports programs and a strong sense of community. The professors are knowledgeable, but the class sizes can be large.",
//           createdAt: "2024-09-01",
//         },
//         {
//           id: 5,
//           collegeId: "college5",
//           collegeName: "Maple University",
//           reviewerName: "Emily Davis",
//           rating: 4.8,
//           reviewText:
//             "Maple University exceeded my expectations with its research facilities and student support services. Highly recommend!",
//           createdAt: "2024-10-05",
//         },
//       ]);
//       setIsLoading(false);
//     }, 1000); // Simulate loading delay
//   }, []);

//   return [reviews, isLoading];
// };

// // Skeleton loader component for reviews
// const SkeletonReviewCard = () => (
//   <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
//     <div className="p-6">
//       <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
//       <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
//       <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />
//       <div className="h-4 bg-gray-300 rounded w-full mb-4" />
//       <div className="h-8 bg-blue-300 rounded-full w-24" />
//     </div>
//   </div>
// );

// const CollegeReviews = () => {
//   const [reviews, isLoading] = useCollegeReviews();
//   const [showAll, setShowAll] = useState(false);
//   const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

//   // Animation variants for cards
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.2,
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     }),
//     hover: {
//       scale: 1.05,
//       boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
//       transition: { duration: 0.3 },
//     },
//   };

//   if (isLoading) {
//     return (
//       <section className="py-12 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//             College Reviews
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(3)].map((_, index) => (
//               <SkeletonReviewCard key={index} />
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (!reviews.length) {
//     return (
//       <section className="py-12 bg-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//             College Reviews
//           </h2>
//           <p className="text-xl text-gray-600 text-center">No reviews found.</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-12 bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//           College Reviews
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {visibleReviews.map((review, index) => (
//             <motion.div
//               key={review.id}
//               custom={index}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               variants={cardVariants}
//               className="bg-white rounded-xl shadow-lg overflow-hidden"
//             >
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                   {review.collegeName}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-2">
//                   <span className="font-semibold">Reviewer:</span>{" "}
//                   {review.reviewerName}
//                 </p>
//                 <div className="flex items-center mb-2">
//                   <span className="font-semibold text-sm text-gray-600 mr-2">
//                     Rating:
//                   </span>
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={`w-5 h-5 ${
//                           i < Math.floor(review.rating)
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     ))}
//                     <span className="ml-2 text-sm text-gray-600">
//                       ({review.rating}/5)
//                     </span>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-4">
//                   {review.reviewText}
//                 </p>
//                 <Link
//                   to={`/colleges/${review.collegeId}`}
//                   className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
//                   aria-label={`View details for ${review.collegeName}`}
//                 >
//                   View College
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//         {reviews.length > 3 && (
//           <div className="text-center mt-8">
//             <button
//               onClick={() => setShowAll(!showAll)}
//               className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
//               aria-label={showAll ? "Show fewer reviews" : "Show more reviews"}
//             >
//               {showAll ? (
//                 <>
//                   Show Fewer <ChevronUpIcon className="w-5 h-5 ml-2" />
//                 </>
//               ) : (
//                 <>
//                   Show More <ChevronDownIcon className="w-5 h-5 ml-2" />
//                 </>
//               )}
//             </button>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default CollegeReviews;
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

// Sample hook to fetch reviews (replace with your actual API call)
const useCollegeReviews = () => {
  const [reviews, setReviews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call (replace with actual fetch to your backend)
    setTimeout(() => {
      setReviews([
        {
          id: 1,
          collegeId: "college1",
          collegeName: "Sunset University",
          reviewerName: "Alice Johnson",
          rating: 4.5,
          reviewText:
            "Sunset University offers an excellent academic environment with supportive faculty. The campus facilities are top-notch, especially the library and sports complex!",
          createdAt: "2024-08-15",
        },
        {
          id: 2,
          collegeId: "college2",
          collegeName: "Brighton College",
          reviewerName: "Michael Chen",
          rating: 4.0,
          reviewText:
            "Great community and diverse programs. The admission process was smooth, but I wish there were more research opportunities for undergraduates.",
          createdAt: "2024-07-20",
        },
        {
          id: 3,
          collegeId: "college3",
          collegeName: "Riverdale Institute",
          reviewerName: "Sarah Patel",
          rating: 3.8,
          reviewText:
            "Riverdale has a vibrant campus life with lots of events. However, some facilities need upgrading, and the advising could be more personalized.",
          createdAt: "2024-06-10",
        },
        {
          id: 4,
          collegeId: "college4",
          collegeName: "Oakwood Academy",
          reviewerName: "David Lee",
          rating: 4.2,
          reviewText:
            "Fantastic sports programs and a strong sense of community. The professors are knowledgeable, but the class sizes can be large.",
          createdAt: "2024-09-01",
        },
        {
          id: 5,
          collegeId: "college5",
          collegeName: "Maple University",
          reviewerName: "Emily Davis",
          rating: 4.8,
          reviewText:
            "Maple University exceeded my expectations with its research facilities and student support services. Highly recommend!",
          createdAt: "2024-10-05",
        },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  return [reviews, isLoading];
};

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
  const [reviews, isLoading] = useCollegeReviews();
  const scrollRef = useRef(null);

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
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" }); // Adjust 320 to match card width + margin
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" }); // Adjust 320 to match card width + margin
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
            className="p-2 bg-gray-300 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 mr-4"
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
                key={review.id}
                custom={index}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={cardVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden min-w-[300px] mx-2 snap-center"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {review.collegeName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Reviewer:</span>{" "}
                    {review.reviewerName}
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
                  <p className="text-sm text-gray-600 mb-4">
                    {review.reviewText}
                  </p>
                  <Link
                    to={`/colleges/${review.collegeId}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    aria-label={`View details for ${review.collegeName}`}
                  >
                    View College
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="p-2 bg-gray-300 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 ml-4"
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
