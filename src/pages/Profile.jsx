/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useUsers from "../hooks/useUsers";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const initialData = {
  photoURL: "https://img.icons8.com/?size=100&id=83190&format=png&color=000000",
  name: "",
  email: "",
  address: "",
  age: "",
  sex: "",
  college: "",
  dob: "",
  bloodGroup: "",
  emergencyContact: "",
};

const Button = ({ children, onClick, className = "" }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-semibold text-white transition duration-300 ${className}`}
  >
    {children}
  </motion.button>
);

const Input = ({ name, value, onChange, type = "text", className = "" }) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    className={`p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
  />
);

const Select = ({ name, value, onChange, options, className = "" }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className={`p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
  >
    <option value="">Select</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const Profile = () => {
  const [userData, isLoadingUserData, userDataRefetch] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  // Sync formData with userData when it loads
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setFormData({
        photoURL: userData.photoURL || initialData.photoURL,
        name: userData.name || "",
        email: userData.email || "",
        address: userData.address || "",
        age: userData.age || "",
        sex: userData.sex || "",
        college: userData.college || "",
        dob: userData.dob || "",
        bloodGroup: userData.bloodGroup || "",
        emergencyContact: userData.emergencyContact || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axiosPublic.patch(
        `/users/${formData.email}`,
        formData
      );
      toast.success("Profile updated successfully!", {
        position: "top-left",
        autoClose: 1500,
        pauseOnHover: true,
      });
      setIsEditing(false);
      userDataRefetch(); // Refresh user data
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "top-left",
        autoClose: 1500,
        pauseOnHover: true,
      });
    }
  };

  if (isLoadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="max-w-3xl mx-auto">
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <img
              src={formData.photoURL || initialData.photoURL}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow"
            />

            {isEditing && (
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-semibold text-gray-600">
                  Photo URL
                </label>
                <Input
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="mt-1 w-full"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Name
                </label>
                {isEditing ? (
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.name || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1"
                    disabled // Email should not be editable
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.email || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Address
                </label>
                {isEditing ? (
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.address || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Age
                </label>
                {isEditing ? (
                  <Input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.age || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Sex
                </label>
                {isEditing ? (
                  <Select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    options={["Male", "Female", "Other"]}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.sex || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  College
                </label>
                {isEditing ? (
                  <Input
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.college || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Date of Birth
                </label>
                {isEditing ? (
                  <Input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData?.dob || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Blood Group
                </label>
                {isEditing ? (
                  <Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.bloodGroup || "--"}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">
                  Emergency Contact
                </label>
                {isEditing ? (
                  <Input
                    name="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="mt-1"
                  />
                ) : (
                  <span className="mt-1 text-base text-gray-800">
                    {formData.emergencyContact || "--"}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;
