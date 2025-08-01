/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";

const initialData = {
  photo: "https://img.icons8.com/?size=100&id=83190&format=png&color=000000",
  name: "Mehedi Hasan",
  email: "mehedi@example.com",
  address: "Dhaka, Bangladesh",
  age: 24,
  sex: "Male",
  college: "ABC University",
  dob: "2001-05-15",
  bloodGroup: "O+",
  emergencyContact: "0123456789",
};

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-semibold text-white transition duration-300 ${className}`}
  >
    {children}
  </button>
);

const Input = ({ name, value, onChange, className = "" }) => (
  <input
    type="text"
    name={name}
    value={value}
    onChange={onChange}
    className={`p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-xl ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-6">{children}</div>;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formData);
    setIsEditing(false);
  };

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
              src={formData.photo}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow"
            />

            {isEditing && (
              <div className="w-full sm:w-1/2">
                <label className="text-sm font-semibold text-gray-600">
                  Photo URL
                </label>
                <Input
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  className="mt-1 w-full"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              {Object.entries(formData).map(
                ([key, value]) =>
                  key !== "photo" && (
                    <div key={key} className="flex flex-col">
                      <label className="text-sm font-semibold capitalize text-gray-600">
                        {key.replace(/([A-Z])/g, " $1")}
                      </label>
                      {isEditing ? (
                        <Input
                          name={key}
                          value={value}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      ) : (
                        <span className="mt-1 text-base text-gray-800">
                          {value}
                        </span>
                      )}
                    </div>
                  )
              )}
            </div>

            <div className="mt-6">
              {isEditing ? (
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 hover:bg-blue-700"
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
