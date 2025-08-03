/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProvider";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Registration = () => {
  const navigate = useNavigate();
  const { createNewUser, setUser, updateUser } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include an uppercase and a lowercase letter."
      );
      return;
    }

    setError("");
    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // Send user data to the backend using axiosPublic
        axiosPublic
          .post("/users", {
            uid: user.uid,
            name: name,
            email: email,
            createdAt: user.metadata.creationTime,
            college: "",
            photoURL: user.photoURL || "",
          })
          .then((response) => {
            console.log("User data saved to backend:", response.data);
          })
          .catch((err) => {
            console.error("Error saving user data:", err);
          });
        toast.success("Congratulations! Successfully created a new account", {
          position: "top-left",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
        });
        updateUser({ displayName: name })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to create account. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? (
                  <IoIosEye size={20} />
                ) : (
                  <IoIosEyeOff size={20} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            Register
          </motion.button>

          <GoogleLogin setError={setError} />
          <FacebookLogin setError={setError} />
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center text-sm text-gray-600"
        >
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Registration;
