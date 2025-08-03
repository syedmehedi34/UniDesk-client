/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FacebookLogin = ({ setError }) => {
  const { signInWithFacebook, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  // Handle Facebook sign-in
  const handleFacebookSignIn = () => {
    signInWithFacebook()
      .then((result) => {
        const user = result.user;
        setUser(user);

        // Send user data to the backend using axiosPublic
        axiosPublic
          .post("/users", {
            uid: user.uid,
            name: user.displayName || "",
            email: user.email || "",
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

        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Failed to sign in with Facebook. Please try again.");
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 2000,
          pauseOnHover: true,
        });
        console.error("ERROR", error.message);
      });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleFacebookSignIn}
        type="button"
        className="w-full mt-4 bg-white text-gray-700 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition duration-200 flex items-center justify-center"
      >
        {/* Facebook SVG icon */}
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#3b5998"
            d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.731 0 1.324-.593 1.324-1.325V1.325C24 .593 23.407 0 22.675 0z"
          />
        </svg>
        Continue with Facebook
      </motion.button>
    </>
  );
};

export default FacebookLogin;
