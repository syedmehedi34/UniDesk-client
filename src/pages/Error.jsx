import React from "react";
import { Link, useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-blue-600 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto">
          It looks like you’ve wandered into uncharted territory. Let’s get you
          back on track!
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={-1}
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Go Back
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Go Home
          </Link>
        </div>
      </div>
      <div className="mt-12"></div>
    </div>
  );
};

export default Error;
