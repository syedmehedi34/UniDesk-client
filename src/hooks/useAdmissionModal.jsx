import { useState, useEffect } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useAdmissionModal = () => {
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
    // console.log(applicationData);
    //? send data to backend here

    // const sendData = await axiosPublic.post(
    //   "/apply-admission",
    //   applicationData
    // );
    // alert("Application submitted successfully!");
    // console.log(sendData);
    try {
      const response = await axiosPublic.post(
        "/apply-admission",
        applicationData
      );
      if (response.data) {
        console.log(response.data);
        alert("Application submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }

    //?
    closeModal();
    //?
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
      candidateName: "",
      subject: "",
      candidateEmail: "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
      image: "",
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
  };
};

export default useAdmissionModal;
