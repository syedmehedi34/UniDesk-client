/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./Header";
import useUniversities from "../../hooks/useUniversities";
import TopColleges from "./TopColleges";
import GraduateMoments from "./GraduateMoments";
import ResearchPapers from "./ResearchPapers";
import CollegeReviews from "./CollegeReviews";

const Home = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  // console.log(universities[0]?.name);
  // console.log(universities);

  const onSearch = (query) => {
    console.log(query);
  };

  return (
    <div>
      <Header onSearch={onSearch} />
      <TopColleges
        universities={universities}
        isLoadingUniversities={isLoadingUniversities}
      />
      <GraduateMoments />
      <ResearchPapers />
      <CollegeReviews />
    </div>
  );
};

export default Home;
