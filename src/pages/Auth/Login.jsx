/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../providers/AuthProvider";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import GoogleLogin from "./GoogleLogin";
import FacebookLogin from "./FacebookLogin";

const Login = () => {
  const { signInUser, setUser, setLoginMail, setLoading } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setLoginMail(email);

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        e.target.reset();
        setError("");
        toast.success("Logged in successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setError("Invalid email or password. Please try again.");
        toast.error("Login failed. Please check your credentials.", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
        console.error("ERROR", error.message);
        e.target.password.value = "";
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
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="/reset-password" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            type="submit"
          >
            Sign In
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
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
