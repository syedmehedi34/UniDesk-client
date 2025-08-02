/* eslint-disable no-unused-vars */
import Header from "./Header";
import useUniversities from "../../hooks/useUniversities";
import TopColleges from "./TopColleges";
import GraduateMoments from "./GraduateMoments";
import ResearchPapers from "./ResearchPapers";
import CollegeReviews from "./CollegeReviews";
import { useState } from "react";
import SearchedColleges from "./SearchedColleges";

const Home = () => {
  const [universities, isLoadingUniversities] = useUniversities();
  const [showSearchedData, setShowSearchedData] = useState(true);
  const [searchedCollegesList, setSearchedCollegeList] = useState("");

  const onSearch = (query) => {
    if (query) {
      setShowSearchedData(true);
      // Filter universities by name (case-insensitive)
      const filteredUniversities = universities.filter((university) =>
        university.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchedCollegeList(filteredUniversities);
    } else {
      setShowSearchedData(false);
    }
  };

  return (
    <div>
      <Header onSearch={onSearch} />

      {showSearchedData && (
        <div className="my-7">
          <SearchedColleges searchedCollegesList={searchedCollegesList} />
        </div>
      )}

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
