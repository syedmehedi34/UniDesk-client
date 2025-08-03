/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { FaBook } from "react-icons/fa";

// Sample hook to fetch research papers (replace with your actual API call)
const useResearchPapers = () => {
  const [papers, setPapers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate API call (replace with actual fetch to your backend)
    setTimeout(() => {
      setPapers([
        {
          id: 1,
          title:
            "Effects of COVID-19 on College Students’ Mental Health in the United States",
          authors: ["Changwon Son", "Sudeep Hegde", "Alec Smith"],
          source: "Journal of Medical Internet Research",
          url: "https://www.jmir.org/2020/9/e21279/",
          published: "2020-09-03",
        },
        {
          id: 2,
          title:
            "The Impact of Social Media on Mental Health Among Adolescents",
          authors: ["Jane Doe", "John Smith"],
          source: "Academia.edu",
          url: "https://www.academia.edu/12345678",
          published: "2023-04-15",
        },
        {
          id: 3,
          title: "Whole Grain Pasta Consumption Among College Students",
          authors: ["Emily Johnson", "Michael Brown"],
          source: "Academia.edu",
          url: "https://www.academia.edu/98765432",
          published: "2022-11-20",
        },
        {
          id: 4,
          title:
            "Unraveling the Effect of COVID-19 on College Students’ Performance",
          authors: ["Fabrizio Patriarca", "Joana Maldonado"],
          source: "Scientific Reports",
          url: "https://www.nature.com/articles/s41598-023-43427-3",
          published: "2023-09-23",
        },
        {
          id: 5,
          title: "The Role of Language in Perpetuating Social Inequalities",
          authors: ["Sarah Lee", "David Kim"],
          source: "Aresty Rutgers Undergraduate Research Journal",
          url: "https://aresty.rutgers.edu/journal",
          published: "2024-02-10",
        },
        {
          id: 6,
          title:
            "The Influence of Mindfulness Practices on Cognitive Performance",
          authors: ["Anna Patel", "Liam Chen"],
          source: "Columbia Undergraduate Science Journal",
          url: "https://cusj.columbia.edu/",
          published: "2023-06-05",
        },
        {
          id: 7,
          title: "The Effect of Climate Change on Biodiversity",
          authors: ["Rachel Green", "Tom Wilson"],
          source: "Place4Papers",
          url: "https://place4papers.com/samples/biology-research-topics",
          published: "2025-01-06",
        },
        {
          id: 8,
          title: "The Impact of AI on Psychological Treatment Ethics",
          authors: ["Sophia Martinez", "Ethan Davis"],
          source: "Amberstudent",
          url: "https://amberstudent.com/blog/post/research-ideas-for-students",
          published: "2025-07-27",
        },
        {
          id: 9,
          title:
            "Machine Learning Approaches to Predict Student Academic Success",
          authors: ["Priya Sharma", "Lucas Nguyen"],
          source: "Journal of Educational Data Mining",
          url: "https://jedm.educationaldatamining.org/",
          published: "2024-10-12",
        },
        {
          id: 10,
          title:
            "Sustainable Urban Planning: Student Perspectives on Green Campus Design",
          authors: ["Olivia Carter", "James Lee"],
          source: "Journal of Sustainability Education",
          url: "http://www.susted.com/wordpress/",
          published: "2025-03-18",
        },
      ]);
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  return [papers, isLoading];
};

// Skeleton loader component for research papers
const SkeletonPaperCard = () => (
  <div className="bg-white rounded-md shadow-sm p-4 animate-pulse">
    <div className="flex items-center mb-3">
      <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
      <div className="h-5 bg-gray-200 rounded w-3/4" />
    </div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
    <div className="h-6 bg-blue-200 rounded-md w-20" />
  </div>
);

const ResearchPapers = () => {
  const [papers, isLoading] = useResearchPapers();
  const [showAll, setShowAll] = useState(false);
  const visiblePapers = showAll ? papers : papers.slice(0, 6);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Student Research Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <SkeletonPaperCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!papers.length) {
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
            Student Research Papers
          </h2>
          <p className="text-gray-600">No research papers found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
          Student Research Papers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visiblePapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="bg-white rounded-md shadow-sm p-4"
            >
              <div className="flex items-center mb-3">
                <FaBook className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="text-base font-medium text-gray-900">
                  {paper.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Authors:</span>{" "}
                {paper.authors.join(", ")}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Source:</span> {paper.source}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Published:</span>{" "}
                {paper.published}
              </p>
              <a
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition-colors"
                aria-label={`Read research paper: ${paper.title}`}
              >
                Read Paper
              </a>
            </motion.div>
          ))}
        </div>
        {papers.length > 6 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              aria-label={showAll ? "Show fewer papers" : "Show more papers"}
            >
              {showAll ? (
                <>
                  Show Fewer <ChevronUpIcon className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Show More <ChevronDownIcon className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchPapers;
