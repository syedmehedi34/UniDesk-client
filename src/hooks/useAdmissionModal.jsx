import { useState, useEffect } from "react";

const useAdmissionModal = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      university: {
        name: selectedUniversity.name,
        location: selectedUniversity.location,
        admissionDates: selectedUniversity.admissionDates,
      },
      formData,
    });
    setIsModalOpen(false);
    setFormData({
      candidateName: "",
      subject: "",
      candidateEmail: "",
      candidatePhone: "",
      address: "",
      dateOfBirth: "",
      image: "",
    });
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
