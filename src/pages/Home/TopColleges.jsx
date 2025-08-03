import { useEffect } from "react";
import { Link } from "react-router";

const TopColleges = ({ universities, isLoadingUniversities }) => {
  useEffect(() => {
    if (!isLoadingUniversities) {
      const timer = setTimeout(() => {
        const cards = document.querySelectorAll(".college-card");
        cards.forEach((card, index) => {
          card.style.transitionDelay = `${index * 0.2}s`;
          card.classList.add("opacity-100", "translate-y-0");
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoadingUniversities]);

  // Sort universities by rating and select top 3
  const topUniversities = universities
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (isLoadingUniversities) {
    return (
      <div className="container mx-auto px-6 py-12 bg-gradient-to-b from-gray-50 to-white">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center tracking-tight">
          Top Colleges
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="h-96 bg-gray-200 animate-pulse rounded-xl shadow-md"
              ></div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-4xl font-bold text-gray-900 text-center tracking-tight  pb-4">
        Top Colleges
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topUniversities.map((college) => (
          <div
            key={college._id}
            className="college-card bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 transform transition-all duration-500 opacity-0 translate-y-6 hover:shadow-2xl hover:-translate-y-2"
          >
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 tracking-wide">
                {college.name}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Admission Dates
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {college.admissionDates.start} to{" "}
                    {college.admissionDates.end}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Upcoming Events
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {college.events.slice(0, 2).map((event, index) => (
                      <li key={index}>
                        <span className="font-medium">{event.name}</span> -{" "}
                        {event.date}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Recent Research
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {college.researchHistory
                      .slice(0, 2)
                      .map((research, index) => (
                        <li key={index}>{research.title}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Sports Programs
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {college.sports.slice(0, 2).map((sport, index) => (
                      <li key={index}>{sport.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to={`colleges/${college._id}`}>
                <button className="mt-6 w-full bg-teal-600 text-white py-2.5 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                  View More Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopColleges;
