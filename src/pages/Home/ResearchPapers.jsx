/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

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
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
      <div className="h-8 bg-blue-300 rounded-full w-24" />
    </div>
  </div>
);

const ResearchPapers = () => {
  const [papers, isLoading] = useResearchPapers();
  const [showAll, setShowAll] = useState(false);
  const visiblePapers = showAll ? papers : papers.slice(0, 6);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
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

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Student Research Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Student Research Papers
          </h2>
          <p className="text-xl text-gray-600 text-center">
            No research papers found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Student Research Papers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePapers.map((paper, index) => (
            <motion.div
              key={paper.id}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {paper.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Authors:</span>{" "}
                  {paper.authors.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Source:</span> {paper.source}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Published:</span>{" "}
                  {paper.published}
                </p>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                  aria-label={`Read research paper: ${paper.title}`}
                >
                  Read Paper
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        {papers.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center bg-gray-300 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
              aria-label={showAll ? "Show fewer papers" : "Show more papers"}
            >
              {showAll ? (
                <>
                  Show Fewer <ChevronUpIcon className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Show More <ChevronDownIcon className="w-5 h-5 ml-2" />
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
