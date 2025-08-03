import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useUsers from "./useUsers";
import { toast } from "react-toastify";

const useAdmissionModal = () => {
  const [userData, isLoadingUserData] = useUsers();
  const axiosPublic = useAxiosPublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    candidateEmail: "",
    candidatePhone: "",
    address: "",
    dateOfBirth: "",
    image: "",
    applicationSubmitted: "",
    universityId: "",
    universityName: "",
    universityLocation: "",
  });

  // Sync formData with userData when userData changes
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        candidateName: userData.name || "",
        candidateEmail: userData.email || "",
        image: userData.photoURL || "",
        address: userData.address || "",
        dateOfBirth: userData.dob || "",
      }));
    }
  }, [userData]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e, onApplicationSubmitted) => {
    e.preventDefault();
    const submissionDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const updatedFormData = {
      ...formData,
      applicationSubmitted: submissionDate,
      universityId: selectedUniversity._id,
      universityName: selectedUniversity.name,
      universityLocation: selectedUniversity.location,
      studentEmail: formData.candidateEmail, // Ensure studentEmail matches candidateEmail
    };

    // console.log("Submitting application:", updatedFormData); // Debug log

    try {
      const response = await axiosPublic.post(
        "/apply-admission",
        updatedFormData
      );
      if (response.data) {
        toast.success("Application submitted successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
        // Call callback with the new application data
        onApplicationSubmitted({
          ...updatedFormData,
          _id: response.data.insertedId || Date.now().toString(), // Use server _id or fallback
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.", {
        position: "top-left",
        autoClose: 1500,
        pauseOnHover: true,
      });
    }
  };

  // Open modal with selected university
  const openModal = (university) => {
    setSelectedUniversity(university);
    setFormData((prev) => ({
      ...prev,
      subject: university.programs[0]?.name || "",
      universityId: university._id,
      universityName: university.name,
      universityLocation: university.location,
    }));
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
    setFormData({
      candidateName: userData.name || "",
      candidateEmail: userData.email || "",
      image: userData.photoURL || "",
      address: userData.address || "",
      dateOfBirth: userData.dob || "",
      candidatePhone: "",
      subject: "",
      applicationSubmitted: "",
      universityId: "",
      universityName: "",
      universityLocation: "",
    });
  };

  return {
    isModalOpen,
    selectedUniversity,
    formData,
    handleInputChange,
    handleSubmit: (e, callback) => handleSubmit(e, callback), // Allow callback injection
    openModal,
    closeModal,
    isLoadingUserData,
  };
};

export default useAdmissionModal;
