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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
    const updatedFormData = {
      ...formData,
      applicationSubmitted: submissionDate,
    };

    const university = {
      universityId: selectedUniversity._id,
      universityName: selectedUniversity.name,
      universityLocation: selectedUniversity.location,
    };

    const applicationData = {
      ...university,
      ...updatedFormData,
    };

    try {
      const response = await axiosPublic.post(
        "/apply-admission",
        applicationData
      );
      if (response.data) {
        toast.success("Application submitted successfully!", {
          position: "top-left",
          autoClose: 1500,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.", {
        position: "top-left",
        autoClose: 1500,
        pauseOnHover: true,
      });
    }

    closeModal();
  };

  // Open modal with selected university
  const openModal = (university) => {
    setSelectedUniversity(university);
    setFormData((prev) => ({
      ...prev,
      subject: university.programs[0]?.name || "", // Default to first program
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
    });
  };

  return {
    isModalOpen,
    selectedUniversity,
    formData,
    handleInputChange,
    handleSubmit,
    openModal,
    closeModal,
    isLoadingUserData,
  };
};

export default useAdmissionModal;
