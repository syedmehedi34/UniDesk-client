import React, { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    photo: "https://img.icons8.com/?size=100&id=83190&format=png&color=000000",
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, City",
    age: 25,
    sex: "Male",
    college: "Example University",
    dob: "1999-01-15",
    bloodGroup: "A+",
    emergencyContact: "987-654-3210",
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Profile:", profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 py-8">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
          Profile
        </h1>
        <div className="max-w-2xl mx-auto bg-gray-50 shadow-md rounded-lg p-6">
          {isEditing ? (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={profile.photo}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center mb-6">
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sex
                  </label>
                  <input
                    type="text"
                    name="sex"
                    value={profile.sex}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={profile.college}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <input
                    type="text"
                    name="bloodGroup"
                    value={profile.bloodGroup}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={profile.emergencyContact}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleSave}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                />
              </div>
              <div className="space-y-3">
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Name:</strong>{" "}
                  {profile.name}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Email:</strong>{" "}
                  {profile.email}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Address:</strong>{" "}
                  {profile.address}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Age:</strong> {profile.age}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Sex:</strong> {profile.sex}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">College:</strong>{" "}
                  {profile.college}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Date of Birth:</strong>{" "}
                  {profile.dob}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Blood Group:</strong>{" "}
                  {profile.bloodGroup}
                </p>
                <p className="text-lg font-medium">
                  <strong className="text-gray-900">Emergency Contact:</strong>{" "}
                  {profile.emergencyContact}
                </p>
              </div>
              <button
                onClick={handleEdit}
                className="mt-6 w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
